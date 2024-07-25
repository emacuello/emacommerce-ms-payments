import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { FindOnePaymentService } from 'src/contexts/payments/application/findOnePayment/findOneProduct.service';
import { NotFoundPaymentException } from 'src/contexts/payments/domain/errors/notFoundPayment.exception';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetOnePaymentDto } from './getOnePayments.dto';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetOnePaymentController {
  constructor(private readonly getOnePaymentService: FindOnePaymentService) {}

  @ApiOperation({ summary: 'Obtener un pago por id' })
  @MessagePattern('get_payment')
  async getOnePayment(@Payload() data: GetOnePaymentDto) {
    try {
      return await this.getOnePaymentService.run(data);
    } catch (error) {
      if (error instanceof NotFoundPaymentException) {
        throw new RpcException(error.message);
      }
      throw new RpcException('Error on get one payment');
    }
  }
}
