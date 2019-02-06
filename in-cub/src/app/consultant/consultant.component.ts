import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Consultant } from '../store';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  consultants;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.consultantList().subscribe(
      x => {
        this.consultants = x
      } ,
      err => console.log('The observable on the consultant page get an error ', err),
      () => console.log("The observable on consultant page complete")
    )
    console.log(this.consultants);
  }

}
