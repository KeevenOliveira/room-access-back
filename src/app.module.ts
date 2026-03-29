import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/infrastructure/database/database.module';
import { AccessCodesModule } from './modules/access-codes/access-codes.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RoomsModule,
    AccessCodesModule,
  ],
})
export class AppModule {}
