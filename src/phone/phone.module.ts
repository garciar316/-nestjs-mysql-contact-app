import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { Phone } from './entity/phone.entity';
import { Contact } from 'src/contact/entity/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Contact])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
