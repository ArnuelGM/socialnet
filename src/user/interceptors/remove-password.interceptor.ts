import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data) && data?.length > 0) {
          data.forEach((post) => {
            if (post?.user) {
              delete post.user.password;
            }
          });
        }
        if (data?.user) {
          delete data.user.password;
          delete data.user.currentPassword;
          delete data.user.passwordConfirmation;
        }
        if (data?.password) {
          delete data.password;
          delete data.currentPassword;
          delete data.passwordConfirmation;
        }
        return data;
      }),
    );
  }
}
