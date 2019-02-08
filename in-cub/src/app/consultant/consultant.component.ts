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
  consultantSelected: Consultant;
  isVisible: boolean;

  nameCtrl: FormControl;
  lastNameCtrl: FormControl;
  descriptionCtrl: FormControl;

  nameEditCtrl: FormControl;
  lastNameEditCtrl: FormControl;
  descriptionEditCtrl: FormControl;

  consultantForm: FormGroup;
  consultantEditForm: FormGroup;

  constructor(private storeService: StoreService, private fb: FormBuilder) {
    this.nameEditCtrl = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.lastNameEditCtrl = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.descriptionEditCtrl = this.fb.control('', [Validators.required, Validators.maxLength(250)]);
    this.consultantEditForm = this.fb.group({
      name: this.nameEditCtrl,
      lastName: this.lastNameEditCtrl,
      description: this.descriptionEditCtrl
    });
  }

  ngOnInit() {
    this.isVisible = false;
    this.consultantSelected = null;
    this.storeService.consultantList().subscribe(
      x => {
        this.consultants = x;
      },
      err => console.log('The observable on the consultant page get an error ', err),
      () => console.log("The observable on consultant page complete")
    )
  }
  toggleForm() {
    if (this.isVisible === false) {
      this.isVisible = true;
      this.consultantSelected = null;

      this.nameCtrl = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
      this.lastNameCtrl = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
      this.descriptionCtrl = this.fb.control('', [Validators.required, Validators.maxLength(250)]);
      this.consultantForm = this.fb.group({
        name: this.nameCtrl,
        lastName: this.lastNameCtrl,
        description: this.descriptionCtrl
      });
    } else {
      this.isVisible = false;
    }
  }

  isEditing(consultant: Consultant) {
    this.isVisible = false;
    this.consultantSelected = consultant;
    this.setStartUp(consultant);
  }

  setStartUp(consultant) {
    this.nameEditCtrl.setValue(consultant.name);
    this.lastNameEditCtrl.setValue(consultant.lastName);
    this.descriptionEditCtrl.setValue(consultant.description);
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
        for (let i = 0; i < this.consultants.length; i++) {
          if (this.consultants[i].id === consultantId) {
            this.consultants.splice(i, 1)
          }
        }
      }
    );
  }

  modify() {
    this.consultantEditForm.value.id = this.consultantSelected.id;
    this.storeService.updateConsultant(this.consultantEditForm.value as Consultant).subscribe(
      x => this.consultantSelected = null,
      err => console.log("The observable making the update get an error : ", err),
      () => console.log("The consultant is update ")
    )
    this.storeService.consultantList().subscribe(
      x => this.consultants = x
    )
  }
}
