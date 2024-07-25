import { Payment } from '../entities/Payment';

export abstract class PaymentsRepository {
  abstract getProducts(): Promise<Payment[]>;
  abstract findById(id: string): Promise<Payment>;
  abstract save(payment: Payment): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
