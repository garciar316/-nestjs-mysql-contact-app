import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact/entity/contact.entity';
import { Phone } from './phone/entity/phone.entity';
import { User } from './user/entity/user.entity';
import { ContactModule } from './contact/contact.module';
import { PhoneModule } from './phone/phone.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'contact_app_db',
      entities: [Contact, Phone, User],
      synchronize: true,
      //dropSchema: true,
    }),
    ContactModule,
    PhoneModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
