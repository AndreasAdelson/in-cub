import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  startups;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.startUpList().subscribe(
      x => {
        this.startups = x
        console.log(this.startups)
      },
      err => console.log("The observable on startup page get an error : ", err),
      () => console.log("The observable on startup page complete")
    )
  }

}
