import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
