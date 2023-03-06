import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'my_database',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
