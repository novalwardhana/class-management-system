import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { ClassRepository } from './repository/class.repository';
import { TeacherRepository } from "../teachers/repository/teacher.repository"
import { SubjectRepository } from "../subjects/repository/subject.repository"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassRepository, TeacherRepository, SubjectRepository])],
  providers: [ClassesService, ClassRepository, TeacherRepository, SubjectRepository],
  controllers: [ClassesController]
})
export class ClassesModule {}
