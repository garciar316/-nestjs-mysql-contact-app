import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Contact } from 'src/contact/entity/contact.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 80 })
  phone: string;

  @ManyToOne(() => Contact, (contact) => contact.phones)
  contact: Contact;
}
