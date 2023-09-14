import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectRepository } from './repository/subject.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository, ClassRepository])],
  providers: [SubjectsService, SubjectRepository, ClassRepository],
  controllers: [SubjectsController]
})
export class SubjectsModule {}
