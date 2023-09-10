import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from "./config/database.config"
import { TeachersModule } from './teachers/teachers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true
    }),
    TypeOrmModule.forRoot(DatabaseConfig()),
    TeachersModule, 
    SubjectsModule, 
    ClassesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
