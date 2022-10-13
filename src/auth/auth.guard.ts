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
      let loggedInUser: string | undefined =
        request?.cookies?.accessToken || undefined;
      if (!loggedInUser) {
        loggedInUser = request.headers.accesstoken;
      }
      const decodeToken = await decode(loggedInUser);

      const userJson = decodeToken;
      request.user = {
        userId: userJson.user_id,
        emailId: userJson.email,
        name: userJson.name,
      };

      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }
}
