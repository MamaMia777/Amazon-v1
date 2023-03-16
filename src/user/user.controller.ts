import { CurrentUser } from './../auth/decorators/user.decorator';
import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // get profile
  // toggle favorites
  // update profile

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('profile')
  @Auth()
  async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @Auth()
  @HttpCode(200)
  @Patch('profile/favorites/:productId')
  async toggleFavorite(@Param('productId') productId: number, @CurrentUser('id') id: number) {
    return this.userService.toggleFavorite(id, +productId)
  }
}
