import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from '../models';
import { Orders, OrdersDoc, Addresses, AddressDoc } from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddressNotFound } from 'src/shared';
import { AddressesService } from './addresses.service';

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

    console.log(addressFrom + " " + addressTo)

    const distance: number = harvesineDistance(addressFrom.location.latitude, addressFrom.location.longitude, addressTo.location.latitude, addressTo.location.longitude);

    const price = 50;

    const doc = new this.orderModel({
      ...body,
      price,
    });

    const order = await doc.save();

    const result = { ...order, distance };

    return { order, distance };
  }
}
