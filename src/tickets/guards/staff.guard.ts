import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    const request = context.switchToHttp().getRequest();
    const staffKey = request.headers['x-staff-key'];
    // Add your staff key validation logic here
    if(staffKey !== 'helpdesk-staff-secret'){
      throw new ForbiddenException('You are not authorized to access this resource.');
    }
    return true;
  }
}
