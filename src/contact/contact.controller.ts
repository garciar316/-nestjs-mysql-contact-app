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
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createContact(
    @Res({ passthrough: true }) res,
    @Body() createContactDto: CreateContactDto,
  ) {
    try {
      const newContact = await this.contactService.createContact(
        createContactDto,
      );
      res.status(HttpStatus.CREATED);
      return newContact;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        message: 'Error: no se creo el contacto',
        error: err.message,
      };
    }
  }

  @Put()
  async updateContact(
    @Res({ passthrough: true }) res,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      const existingContact = await this.contactService.updateContact(
        updateContactDto,
      );
      res.status(HttpStatus.OK);
      return existingContact;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        message: 'Ha ocurrido un error, no se ha actualizado el contacto',
        error: err.message,
      };
    }
  }

  @Get()
  async getContacts(@Res({ passthrough: true }) res) {
    try {
      const contactData = await this.contactService.getContacts();
      res.status(HttpStatus.OK);
      return contactData;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Get(':id')
  async getContactById(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) contactId: number,
  ) {
    try {
      const contact = await this.contactService.getContactById(contactId);
      res.status(HttpStatus.OK);
      return contact;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Get('by_user/:userId')
  async getContactsByUserId(
    @Res({ passthrough: true }) res,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      const contacts = await this.contactService.getContactsByUserId(userId);
      res.status(HttpStatus.OK);
      return contacts;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Delete(':id')
  async deleteContact(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) contactId: number,
  ) {
    try {
      const message = await this.contactService.deleteContact(contactId);
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
