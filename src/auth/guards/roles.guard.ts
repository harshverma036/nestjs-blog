import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { iUser } from 'src/user/models/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const user: iUser = request.user;

    const findUser = await this.userService.findOne(user.id);

    const hasRole = () => roles.indexOf(findUser.role) > -1;
    let hasPermission = false;

    if (hasRole()) {
      hasPermission = true;
    }

    return user && hasPermission;
  }
}
