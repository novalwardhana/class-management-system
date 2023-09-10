import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TeacherRepository } from './repository/teacher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository])],
  providers: [TeachersService, TeacherRepository],
  controllers: [TeachersController]
})
export class TeachersModule {}
