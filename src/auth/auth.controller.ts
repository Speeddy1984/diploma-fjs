import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /api/auth/login – вход
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Res() res: Response) {
    return new Promise((resolve, reject) => {
      req.logIn(req.user!, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          console.log('Пользователь после аутентификации:', req.user);
          resolve(
            res.json({
              email: (req.user as any).email,
              name: (req.user as any).name,
              contactPhone: (req.user as any).contactPhone,
            }),
          );
        }
      });
    });
  }

  // POST /api/auth/logout – выход
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: Error | null) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка при разлогинивании' });
      }
      return res.status(200).json({});
    });
  }
}
