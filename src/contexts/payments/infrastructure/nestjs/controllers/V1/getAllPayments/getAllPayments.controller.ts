import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { FindAllPaymentService } from 'src/contexts/payments/application/findAllPayment/findAllPayment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetAllPaymentsController {
  constructor(private readonly getAllPaymentsService: FindAllPaymentService) {}

  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @MessagePattern('get_payments')
  async getAllPayments() {
    try {
      return await this.getAllPaymentsService.run();
    } catch (error) {
      throw new RpcException('Error on get all payments');
    }
  }
}
