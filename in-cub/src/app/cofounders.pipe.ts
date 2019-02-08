import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cofounders'
})
export class CofoundersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 0) {
      return 'Aucun'
    } else if(value === 1) {
      return 'Unique'
    } else if(value === 2) {
      return 'Couple'
    } else if(value > 2) {
      return 'Groupes'
    }
  }

}
