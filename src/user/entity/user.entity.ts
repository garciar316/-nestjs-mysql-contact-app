import { Contact } from 'src/contact/entity/contact.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 80 })
  username: string;

  @Column({ type: 'varchar', width: 80 })
  password: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
