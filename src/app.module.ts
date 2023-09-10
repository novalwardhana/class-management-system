import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [TeachersModule, SubjectsModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
