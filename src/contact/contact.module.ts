import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entity/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
