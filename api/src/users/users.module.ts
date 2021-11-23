import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './user.controller';
import { AppService } from 'src/app.service';
import { MailModule } from 'src/mail/mail.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  providers: [ UsersService, AppService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}