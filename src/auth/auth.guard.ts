import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const loggedInUser: string | undefined = request.cookies.login;
      const decodeToken = await decode(loggedInUser);

      const userJson = decodeToken;
      console.log(userJson);
      request.user = {
        userId: `Alpha`,
        emailId: 'nkm@123.com',
      };

      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }
}
