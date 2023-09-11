import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectRepository } from './repository/subject.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository])],
  providers: [SubjectsService, SubjectRepository],
  controllers: [SubjectsController]
})
export class SubjectsModule {}
