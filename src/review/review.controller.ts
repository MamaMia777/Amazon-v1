import { ReviewDto } from './category.dto';
import { Body, Controller, Get, HttpCode, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewService } from './review.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }


  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get('create/:productId')
  async createReview(
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
    @CurrentUser('id') id: number
  ) {
    return this.reviewService.create(id, dto, +productId)
  }

  @Get('average-by-product/:productId')
  async getAverageByProduct(
    @Param('productId') productId: string,
  ) {
    return this.reviewService.averageRating(+productId)
  }

}
