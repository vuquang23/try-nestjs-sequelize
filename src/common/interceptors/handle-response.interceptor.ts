import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class HandleResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          data: data,
          meta: {
            message: 'OK',
          },
        };
      })
    );
  }
}
