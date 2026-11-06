import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service.js';
import { PatientsController } from './patients.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity.js';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [TypeOrmModule.forFeature([Patient])]
})
export class PatientsModule {}
