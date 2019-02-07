import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultant } from '../store';


@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  consultants;
  nameCtrl: FormControl;
  lastNameCtrl: FormControl;
  descriptionCtrl: FormControl;
  consultantForm: FormGroup;
  isVisible: boolean;

  constructor(private storeService: StoreService, private fb: FormBuilder) {
    this.nameCtrl = this.fb.control('', Validators.required);
    this.lastNameCtrl = this.fb.control('', Validators.required);
    this.descriptionCtrl = this.fb.control('', Validators.required);
    this.consultantForm = this.fb.group({
      name: this.nameCtrl,
      lastName: this.lastNameCtrl,
      description: this.descriptionCtrl
    });
   }

  ngOnInit() {
    this.isVisible = false;
    this.storeService.consultantList().subscribe(
      x => {
        this.consultants = x;
      } ,
      err => console.log('The observable on the consultant page get an error ', err),
      () => console.log("The observable on consultant page complete")
    )
  }
  toggleForm() {
    if(this.isVisible === false) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  register() {
    this.storeService.addConsultant(this.consultantForm.value as Consultant).subscribe(
      x => { this.consultants.push(x) }
    );
    this.isVisible = false;
  }

  delete(consultantId) {
    this.storeService.deleteConsultant(consultantId as number).subscribe(
      x => { 
        for(let i = 0; i < this.consultants.length; i++){
          if(this.consultants[i].id === consultantId) {
            this.consultants.splice(i, 1)
          }
        }
       }
    );
  }
}
