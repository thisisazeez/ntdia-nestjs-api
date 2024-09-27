import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { SchoolModule } from './modules/school/school.module';
import { ScraperModule } from './modules/scraper/scraper.module';
import { SchoolService } from './modules/school/school.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res })
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    SchoolModule,
    ScraperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly schoolSvc: SchoolService){
    this.seed();
  }

  private async seed(){
    const school = await this.schoolSvc.find({});
    if(school.length <= 0){
      console.log("Seeding DB...");
      this.schoolSvc.seed();
      
    }
  }
}
