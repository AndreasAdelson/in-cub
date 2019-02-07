import { Pipe, PipeTransform } from '@angular/core';
import { empty } from 'rxjs';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === "") {
      return 'Non';
    } else {
      return 'Oui'
    }
  }

}
