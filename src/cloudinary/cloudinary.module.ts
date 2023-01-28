import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary';

@Module({
  providers: [CloudinaryService, Cloudinary]
})
export class CloudinaryModule {}
