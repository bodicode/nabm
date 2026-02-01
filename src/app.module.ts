import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CourtsModule } from './courts/courts.module';
import { TeamsModule } from './teams/teams.module';
import { BookingsModule } from './bookings/bookings.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CourtsModule, TeamsModule, BookingsModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
