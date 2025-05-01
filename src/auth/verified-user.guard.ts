import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { database } from '../database/arangodb.provider';
import { aql } from 'arangojs';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new UnauthorizedException('User not authenticated');

    const cursor = await database.query(
      aql`FOR u IN users FILTER u._key == ${user.userId} RETURN u`,
    );
    const dbUser = await cursor.next();
    if (!dbUser || dbUser.isVerified !== true) {
      throw new UnauthorizedException('Account not verified');
    }
    return true;
  }
}
