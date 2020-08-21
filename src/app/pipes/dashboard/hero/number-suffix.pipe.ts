import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {

  transform(value: number, args?: number): string | number {
    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

    if (Number.isNaN(value)) {
      return 0;
    }

    if (value < 1000) {
      return value;
    }

    exp = Math.floor(Math.log(value) / Math.log(1000));

    return (value / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }

}
