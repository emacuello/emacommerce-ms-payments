import { Controller, HttpStatus } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { DeletePaymentService } from 'src/contexts/payments/application/deletePayment/deletePayment.service';
import { ErrorDeletePaymentException } from 'src/contexts/payments/domain/errors/errorDeletePayment.exception';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { DeletePaymentDto } from './deletePayments.dto';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeletePaymentController {
  constructor(private readonly deletePaymentService: DeletePaymentService) {}
  @ApiOperation({ summary: 'Elimina un pago por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Se elimino el pago correctamente',
  })
  @MessagePattern('delete.payment')
  async deletePayment(@Payload() data: DeletePaymentDto) {
    try {
      return await this.deletePaymentService.run(data);
    } catch (error) {
      if (error instanceof ErrorDeletePaymentException) {
        throw new RpcException(error.message);
      }
      throw new RpcException('Conflict on delete payment');
    }
  }
}
