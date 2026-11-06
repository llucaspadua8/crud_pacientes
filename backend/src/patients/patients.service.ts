import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity.js';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const existeCPF = await this.patientsRepository.findOneBy({CPF: createPatientDto.CPF})
    if (existeCPF){
      throw new ConflictException(`Já existe um paciente com esse CPF`)
    }
    const patient = this.patientsRepository.create(createPatientDto)
    return await this.patientsRepository.save(patient)
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.findOne(id)
    const existeCPF = await this.patientsRepository.findOneBy({CPF: updatePatientDto.CPF})
    if (existeCPF && id !== existeCPF.id){
      throw new ConflictException(`Já existe um paciente com esse CPF`)
    }
    await this.patientsRepository.update(id, updatePatientDto)
    return await this.findOne(id)
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patientId = await this.patientsRepository.findOneBy({id})
    if (!patientId){
      throw new NotFoundException(`Paciente ${id} não encontrado`)
    }
    return patientId
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.patientsRepository.delete(id);
  }
}
