import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './entities/request.entity';
import { MaterialDetail } from './entities/material-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, MaterialDetail])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
