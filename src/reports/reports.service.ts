import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);

    // the user id is automatically extracted
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException(`Report of id ${id} not found`);
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make == :make', { make }) // :make will take the value we specify in the object
      .andWhere('model == :model', { model })
      .andWhere('lng -:lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
      .andWhere('year -:year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage }) // orderBy doesn't have a second arg to take the param
      .limit(3) // take only the top 3
      .getRawOne();
  }
}
