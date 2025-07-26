import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDay'
})
export class AddDayPipe implements PipeTransform {
  transform(value: Date | string): Date | null {
    if (!value) return null;

    const date = new Date(value);
    date.setDate(date.getDate() + 1);
    return date;
  }
}