import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Addresses, AddressDoc } from '../schema';



@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Addresses.name)
    private readonly addressModel: Model<AddressDoc>,
  ) { }
  async findAddresses(address: string): Promise<AddressDoc | null> {
    const resAddress = (await this.addressModel.findOne({ name: address }));
    return resAddress;
  }


}