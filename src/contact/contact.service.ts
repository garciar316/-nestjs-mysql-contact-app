import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entity/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const user = await this.userRepository.findOneBy({
      id: createContactDto.user.id,
    });

    if (!user) {
      throw new NotFoundException(
        `No se puede crear el contacto, porque el usuario con id ${createContactDto.user.id} no existe`,
      );
    }
    return this.contactRepository.save(createContactDto);
  }

  async updateContact(updateContactDto: UpdateContactDto): Promise<Contact> {
    if (!updateContactDto.id) {
      throw new NotFoundException(
        `Para actualizar el contacto debe ingresar el id`,
      );
    }

    const existingContact = await this.contactRepository.findOneBy({
      id: updateContactDto.id,
    });

    if (!existingContact) {
      throw new NotFoundException(
        `El contacto que intenta actualizar no existe`,
      );
    }

    this.contactRepository.merge(existingContact, updateContactDto);
    return this.contactRepository.save(existingContact);
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.contactRepository.find();
    if (!contacts) {
      throw new NotFoundException('No se encontraron contactos');
    }
    return contacts;
  }

  async getContactById(contactId: number): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id: contactId });
    if (!contact) {
      throw new NotFoundException(
        `No se encontro ningun contacto con el id ${contactId}`,
      );
    }
    return contact;
  }

  async getContactsByUserId(userId: number): Promise<Contact[]> {
    const contacts = await this.contactRepository.findBy({
      user: { id: userId },
    });
    if (!contacts) {
      throw new NotFoundException(
        `No se encontraron contactos para el usuario ${userId}`,
      );
    }
    return contacts;
  }

  async deleteContact(contactId: number): Promise<string> {
    const existingContact = await this.contactRepository.findOneBy({
      id: contactId,
    });
    if (!existingContact) {
      return `No existe un contacto con el id ${contactId}`;
    }
    const message = await this.contactRepository.delete(contactId);
    if (message.affected === 0) {
      return `Ha ocurrido un error y no se elimino el contacto`;
    }
    return 'Se ha eliminado con exito el contacto';
  }
}
