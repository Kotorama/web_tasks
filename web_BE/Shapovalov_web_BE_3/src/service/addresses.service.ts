import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Addresses, AddressDoc, AddressLeanDoc } from '../schema';



@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Addresses.name)
    private readonly addressModel: Model<AddressDoc>,
  ) { }
  async findAddresses(address: string) {
    const resAddress = await this.addressModel.findOne({ name: address }, { location: 1 });
    console.log(resAddress)
    const result = resAddress.toObject();
    console.log("result ", result)
    return result;
  }

}