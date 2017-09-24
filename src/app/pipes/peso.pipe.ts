import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'peso'})
export class PesoPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}