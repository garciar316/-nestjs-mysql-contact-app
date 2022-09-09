import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Post()
  async createPhone(
    @Res({ passthrough: true }) res,
    @Body() createPhoneDto: CreatePhoneDto,
  ) {
    try {
      const newPhone = await this.phoneService.createPhone(createPhoneDto);
      res.status(HttpStatus.CREATED);
      return newPhone;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        message: 'Error: no se creo el teléfono',
        error: err.message,
      };
    }
  }

  @Put()
  async updatePhone(
    @Res({ passthrough: true }) res,
    @Param('id') phoneId: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    try {
      const existingPhone = await this.phoneService.updatePhone(updatePhoneDto);
      res.status(HttpStatus.OK);
      return existingPhone;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        message: 'Ha ocurrido un error, no se ha actualizado el teléfono',
        error: err.message,
      };
    }
  }
  @Get()
  async getPhones(@Res({ passthrough: true }) res) {
    try {
      const phoneData = await this.phoneService.getPhones();
      res.status(HttpStatus.OK);
      return phoneData;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Get(':id')
  async getPhoneById(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) phoneId: number,
  ) {
    try {
      const teléfono = await this.phoneService.getPhoneById(phoneId);
      res.status(HttpStatus.OK);
      return teléfono;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Get('by_contact/:contactId')
  async getPhonesByContactId(
    @Res({ passthrough: true }) res,
    @Param('contactId') contactId,
  ) {
    try {
      const phones = await this.phoneService.getPhonesByContactId(contactId);
      res.status(HttpStatus.OK);
      return phones;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Delete(':id')
  async deletePhone(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) phoneId: number,
  ) {
    try {
      const message = await this.phoneService.deletePhone(phoneId);
      res.status(HttpStatus.OK);
      return { message };
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }
}
