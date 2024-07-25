import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PaymentsRepository } from '../../domain/repository/payments.repository';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE, USER_SERVICE } from 'src/utils/ms/msNames';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Payment } from '../../domain/entities/Payment';
import { firstValueFrom } from 'rxjs';
import { ErrorSavePaymentException } from '../../domain/errors/errorSavePayment.exception';
import { ErrorDeletePaymentException } from '../../domain/errors/errorDeletePayment.exception';
import { NotFoundPaymentException } from '../../domain/errors/notFoundPayment.exception';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Payment as PaymentEntity,
  ProductTypeORM,
  UserTypeORM,
} from '../../infrastructure/typeorm/payment.entitie';
import { Repository } from 'typeorm';

@Injectable()
export class MicroserviceRepository extends PaymentsRepository {
  constructor(
    @Inject(PRODUCT_SERVICE) private productClient: ClientProxy,
    @Inject(USER_SERVICE) private usersClient: ClientProxy,
    @InjectRepository(PaymentEntity)
    private paymentsRepository: Repository<PaymentEntity>,
  ) {
    super();
  }
  async save(payment: Payment): Promise<string> {
    const user = this.usersClient.send('getOne', {
      id: payment.toValue().user.id,
    });
    const products = this.productClient.send('getManyProducts', {
      ids: payment.toValue().products,
    });
    try {
      const userdb = (await firstValueFrom(user)) as UserTypeORM;
      const productsdb = (await firstValueFrom(products)) as ProductTypeORM[];
      await this.paymentsRepository.save({
        amount: payment.amount,
        user: userdb,
        products: productsdb,
      });
      return 'Pago creado correctamente';
    } catch (error) {
      throw new ErrorSavePaymentException(error);
    }
  }
  async delete(id: string): Promise<string> {
    try {
      await this.paymentsRepository.delete(id);
      return 'Se elimino el pago correctamente';
    } catch (error) {
      throw new ErrorDeletePaymentException(error);
    }
  }
  async findById(id: string): Promise<Payment> {
    try {
      const result = await this.paymentsRepository.findOneBy({ id });
      return Payment.create(result);
    } catch (error) {
      throw new NotFoundPaymentException(error);
    }
  }
  async getProducts(): Promise<Payment[]> {
    try {
      const result = await this.paymentsRepository.find();
      return result.map((payment) => Payment.create(payment));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
