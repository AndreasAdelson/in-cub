import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Consultant, StartUp } from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'In-cub';
  consultantListe: Array<Consultant> = [];
  startUpListe: Array<StartUp> = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.consultantList().subscribe(
      x => {
        let max = 3
        if(x.length < 3) {
          max = x.length;
        }
        for(let i = 0; i < max; i++) {
          this.consultantListe.push(x[i])
        }
      },
      err => console.log("The observable get an error" + err),
      () => console.log("The observable for consultant list on home page complete")
    );

    this.storeService.startUpList().subscribe(
      x => {
        console.log(x.length)
        let max = 3;
        if(x.length < 3) {
          max = x.length;
        }
        for(let i = 0; i < max; i++){
          this.startUpListe.push(x[i]);
        }
      },
      err =>  console.log("The observable get an error" + err),
      () => console.log("The observable for startup list on home page complete")
    );
    console.log(this.consultantListe);
    console.log(this.startUpListe);
  }

}
