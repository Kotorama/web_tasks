import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { OrderService } from '../service';
import { OrderDto } from '../models';
import { UserLeanDoc } from '../schema';

@Controller({ path: '/orders' })
export class OrdersController {
  constructor(private readonly orderService: OrderService) { }

  @Post('/')
  async createOrder(
    @Body() body: OrderDto,
    @Req() req: Request & { user: UserLeanDoc },
  ) {
    try {
      const { user } = req;

      const order = await this.orderService.createOrder({
        ...body,
        login: user.login,
      });
      return order;
    } catch (err) {
      throw err;
    }
  }

  @Get('/')
  async getOrders(
    @Req() req: Request & { user: UserLeanDoc },
  ) {
    try {
      const { user } = req;

      const order = await this.orderService.getOrders({
        login: user.login,
        role: user.role
      });
      return order;
    } catch (err) {
      throw err;
    }
  }

  @Patch('/:orderId')
  async changeOrderStatus(
    @Body() body: { status: string },
    @Req() req: Request & { user: UserLeanDoc },
    @Param('orderId') id: string
  ) {
    try {
      const { user } = req;
      console.log("Order id ", id)
      const { status } = body;

      const order = await this.orderService.changeOrderStatus({ orderId: id, role: user.role, status: body.status });
      return order;
    } catch (err) {
      throw err;
    }
  }
}
