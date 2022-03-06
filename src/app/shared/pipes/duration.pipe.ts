import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
  })
export class DurationPipe implements PipeTransform {
    transform(value: any) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const hoursRightFormat = hours < 10 ? '0' + hours : hours;
        const minutesRightFormat = minutes < 10 ? '0' + minutes : minutes;
        return `${hoursRightFormat}:${minutesRightFormat}`
    }

}