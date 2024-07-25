import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'payments',
})
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'json' })
  user: UserTypeORM;
  @Column()
  amount: number;
  @Column({ type: 'simple-json' })
  products: ProductTypeORM[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export interface ProductTypeORM {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imgUrl?: string;
  category?: string;
}

export interface UserTypeORM {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
  role?: string;
  birthdate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
