import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => this.transform(data)));
  }

  transform(data: any): any {
    // Recursive transformation logic to convert BigInt to string
    if (Array.isArray(data)) {
      return data.map(item => this.transform(item));
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) { // Ensure the key belongs to the object, not its prototype
          if (typeof data[key] === 'bigint') {
            // Check if the property is writable
            const descriptor = Object.getOwnPropertyDescriptor(data, key);
            if (descriptor && descriptor.writable) {
              data[key] = data[key].toString();
            }
          } else if (typeof data[key] === 'object') {
            data[key] = this.transform(data[key]);
          }
        }
      }
    }
    return data;
  }
}