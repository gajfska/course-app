import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'creationDate',
})
export class CreationDatePipe implements PipeTransform {
  transform(date: Date): string {
    return formatDate(date, 'dd.MM.yyyy', 'en_US');
  }
}
