import { Phone } from 'src/phone/entity/phone.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 80 })
  name: string;

  @Column({ type: 'varchar', width: 80 })
  surname: string;

  @Column({ default: true })
  state: boolean;

  @OneToMany(() => Phone, (phone) => phone.contact)
  phones: Phone[];

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
