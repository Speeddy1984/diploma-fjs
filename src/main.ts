import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as mongoose from 'mongoose';
import { User, UserSchema } from './users/schemas/user.schema';

if (!mongoose.models['User']) {
  mongoose.model('User', UserSchema);
}

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  console.log('Deserializing user:', user);
  done(null, user);
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Раздача файлов из папки uploads
  app.useStaticAssets(join(__dirname, '..', 'src/uploads'), {
    prefix: '/uploads/',
  });

  // cookie-parser
  app.use(cookieParser());

  // Настройка сессии
  const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  });
  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(process.env.HTTP_PORT || '3000'));
}
bootstrap();
