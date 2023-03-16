import { Body, Controller, Get, HttpCode, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from 'src/review/category.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }


  @Get('main')
  @Auth()
  async getMainStatistics(
    @CurrentUser('id') id: number
  ) {
    return this.statisticsService.get(id)
  }
}
