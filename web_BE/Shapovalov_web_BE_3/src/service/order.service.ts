import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from '../models';
import { Orders, OrdersDoc, Addresses, AddressDoc } from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddressNotFound } from 'src/shared';
import { AddressesService } from './addresses.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<OrdersDoc>,
    private readonly addressService: AddressesService,
  ) { }

  async createOrder(body: OrderDto & { login: string }) {
    const addressFrom = await this.addressService.findAddresses(body.from);
    const addressTo = await this.addressService.findAddresses(body.to);

    if (!addressTo || !addressFrom) {
      throw new BadRequestException('Address is not found');
    }

    const harvesineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const deltaLat = Math.abs(lat2 - lat1);
      const deltaLon = Math.abs(lon2 - lon1);
      return Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
    };

    const coef = { "standard": 2.5, "lite": 1.5, "universal": 3 };

    console.log(addressFrom + " " + addressTo)

    const distance: number = harvesineDistance(addressFrom.location.latitude, addressFrom.location.longitude, addressTo.location.latitude, addressTo.location.longitude);

    if (!coef[body.type]) {
      throw new BadRequestException('Invalid type');
    }
    const price = distance * coef[body.type];

    const status = "Active";

    const doc = new this.orderModel({
      ...body,
      price,
      status
    });

    const order = await doc.save();

    const result = { ...order, distance };

    return { order, distance };
  }

  async getOrders(body: { login: string, role: string }) {
    if (body.role == "Driver") {
      const orders = await this.orderModel.find({ status: "Active" });
      return orders;
    }
    const orders = await this.orderModel.find({ login: body.login });
    return orders;
  }

  async changeOrderStatus(body: { orderId: string, role: string, status: string }) {
    const order = (await this.orderModel.findById(body.orderId));
    const id = new ObjectId(body.orderId);

    if (order.status)

      switch (body.role) {
        case "Customer":
          if (!(order.status === "Active" && body.status === "Rejected")) {
            throw new BadRequestException('Invalid status change attempt');
          }
          break;
        case "Driver":
          if (!(order.status === "Active" && body.status === "In progress" || order.status === "In progress" && body.status === "Done")) {
            throw new BadRequestException('Invalid status change attempt');
          } break;
        case "Admin":
          if (!(order.status === "Active" && (body.status === "In progress" || body.status === "Rejected") || order.status === "In progress" && body.status === "Done")) {
            throw new BadRequestException('Invalid status change attempt');
          } break;
      }
    const result = await this.orderModel.findOneAndUpdate(
      { _id: order.id },
      { status: body.status }, { new: true })
    return result;
  }
}

