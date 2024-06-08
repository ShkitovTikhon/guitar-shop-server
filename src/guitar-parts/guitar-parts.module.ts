import { Module } from '@nestjs/common';
import { GuitarPartsController } from './guitar-parts.controller';
import { GuitarPartsService } from './guitar-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuitarParts } from './guitar-parts.model';

@Module({
  imports: [SequelizeModule.forFeature([GuitarParts])],
  controllers: [GuitarPartsController],
  providers: [GuitarPartsService],
  exports: [GuitarPartsService],
})
export class GuitarPartsModule {}
