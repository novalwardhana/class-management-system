import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TeacherRepository } from './repository/teacher.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository, ClassRepository])],
  providers: [TeachersService, TeacherRepository, ClassRepository],
  controllers: [TeachersController]
})
export class TeachersModule {}
