import { Pipe, PipeTransform } from '@angular/core';

/** Format a number as Vietnamese đồng — e.g. 299000 -> "299.000₫". */
@Pipe({ name: 'vnd' })
export class VndPipe implements PipeTransform {
  transform(n: number | null | undefined): string {
    return (n ?? 0).toLocaleString('vi-VN') + '₫';
  }
}
