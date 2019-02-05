import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  inputs:['entity','color']
})
export class CardComponent implements OnInit {

  title: string;
  description: string;
  lastName: string;
  colors: string;

  set entity(value) {
    this.title = value.name;
    this.description =  value.description;
    this.lastName = value.lastName ? value.lastName : value.legalAgent
  }

  set color(value) {
    this.colors = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
