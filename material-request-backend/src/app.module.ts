import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './requests/requests.module';
import { Request } from './requests/entities/request.entity';
import { MaterialDetail } from './requests/entities/material-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     
      password: '....',     
      database: 'material_request_db',
      entities: [Request, MaterialDetail],
      synchronize: true,         
    }),
    RequestsModule,
  ],
})
export class AppModule {}
