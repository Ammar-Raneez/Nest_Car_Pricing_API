import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// use requires due to a compatibility issue with cookie session and tsconfig
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      // use this config module for the entire app
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),

    // typeorm with some configuration for entire project
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',

    //   // db name
    //   database: 'db.sqlite',

    //   // the entities/models
    //   entities: [User, Report],

    //   // the structure is created cuz of this attribute
    //   // a SQL database is always kept as a rigid structure
    //   // if we wanna change that structure (new/remove column etc) we must write a migration
    //   // based on the entity typeorm would change the table structure automatically. This must therefore be
    //   // used only in dev, when we aren't so sure about the structure, not in prod (ex: to prevent any accidental column being removed)
    //   // Would use migrations in prod, if necessary
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')],
      }),
    ).forRoutes('*');
  }
}
