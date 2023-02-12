import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Fremdschulssel für seller

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: false })
  priceStatus: boolean;

  @ManyToOne((type) => User, (user) => user.product, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
