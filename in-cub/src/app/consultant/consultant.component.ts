import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Consultant } from '../store';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  consultants: Array<Consultant> = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.consultantList().subscribe(
      x => {
        console.log(x);
        x.forEach(consultant => {
          this.consultants.push(consultant);
        }); 
      } ,
      err => console.log('The observable on the consultant page get an error ', err),
      () => console.log("The observable on consultant page complete")
    )
    console.log(this.consultants);
  }

}
