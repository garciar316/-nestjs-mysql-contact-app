import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entity/contact.entity';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entity/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createPhone(createPhonetDto: CreatePhoneDto): Promise<Phone> {
    const contact = await this.contactRepository.findOneBy({
      id: createPhonetDto.contact.id,
    });

    if (!contact) {
      throw new NotFoundException(
        `No se puede crear el teléfono, porque el contacto con id ${createPhonetDto.contact.id} no existe`,
      );
    }
    return this.phoneRepository.save(createPhonetDto);
  }

  async updatePhone(updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    if (!updatePhoneDto.id) {
      throw new NotFoundException(
        `Para actualizar el teléfono debe ingresar el id`,
      );
    }

    const existingPhone = await this.phoneRepository.findOneBy({
      id: updatePhoneDto.id,
    });

    if (!existingPhone) {
      throw new NotFoundException(
        `El teléfono que intenta actualizar no existe`,
      );
    }

    this.phoneRepository.merge(existingPhone, updatePhoneDto);
    return this.phoneRepository.save(existingPhone);
  }

  async getPhones(): Promise<Phone[]> {
    const phones = this.phoneRepository.find();
    if (!phones) {
      throw new NotFoundException(`No se encontraon telefonos`);
    }
    return phones;
  }

  async getPhoneById(phoneId: number): Promise<Phone> {
    const phone = await this.phoneRepository.findOneBy({ id: phoneId });
    if (!phone) {
      throw new NotFoundException(
        `No se encontro ningun teléfono con el id: ${phoneId}`,
      );
    }
    return phone;
  }

  async getPhonesByContactId(contactId: number): Promise<Phone[]> {
    const phones = await this.phoneRepository.findBy({
      contact: { id: contactId },
    });
    if (!phones) {
      throw new NotFoundException(
        `No se encontraon telefonos para el contacto ${contactId}`,
      );
    }
    return phones;
  }

  async deletePhone(phoneId: number): Promise<string> {
    const existingPhone = await this.phoneRepository.findOneBy({
      id: phoneId,
    });
    if (!existingPhone) {
      return `No existe un teléfono con el id ${phoneId}`;
    }
    const message = await this.phoneRepository.delete(phoneId);
    if (message.affected === 0) {
      return `Ha ocurrido un error y no se elimino el teléfono`;
    }
    return 'Se ha eliminado con exito el teléfono';
  }
}
