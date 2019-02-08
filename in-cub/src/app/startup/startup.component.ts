import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StartUp } from '../store';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  isVisible: boolean;
  startups;
  consultants;
  startUp: StartUp;
  nameCtrl: FormControl;
  legalAgentCtrl: FormControl;
  coFoundersCtrl: FormControl;
  descriptionCtrl: FormControl;
  addressCtrl: FormControl;
  consultantCtrl: FormControl;
  activityCtrl: FormControl;

  nameEditCtrl: FormControl;
  legalAgentEditCtrl: FormControl;
  coFoundersEditCtrl: FormControl;
  descriptionEditCtrl: FormControl;
  addressEditCtrl: FormControl;
  consultantEditCtrl: FormControl;
  activityEditCtrl: FormControl;

  startupForm: FormGroup;
  startupEditForm: FormGroup;

  constructor(private storeService: StoreService, private fb: FormBuilder) {
    this.nameEditCtrl = this.fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
    this.legalAgentEditCtrl = this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]);
    this.coFoundersEditCtrl = this.fb.control('', Validators.required);
    this.descriptionEditCtrl = this.fb.control('', [Validators.required, Validators.maxLength(250)]);
    this.addressEditCtrl = this.fb.control('', Validators.maxLength(25));
    this.consultantEditCtrl = this.fb.control('', Validators.required);
    this.activityEditCtrl = this.fb.control('', [Validators.required, Validators.maxLength(10)]);
    this.startupEditForm = this.fb.group({
      name: this.nameEditCtrl,
      activity: this.activityEditCtrl,
      legalAgent: this.legalAgentEditCtrl,
      coFounders: this.coFoundersEditCtrl,
      description: this.descriptionEditCtrl,
      address: this.addressEditCtrl,
      consultant: this.consultantEditCtrl
    });
  }

  ngOnInit() {
    this.startUp = null;
    this.isVisible = false;
    this.storeService.startUpList().subscribe(
      x => {
        this.startups = x;
      },
      err => console.log("The observable on startup page get an error : ", err),
      () => console.log("The observable on startup page complete")
    );
    this.storeService.consultantList().subscribe(
      x => this.consultants = x
    )
  }

  toggleForm() {
    if (this.isVisible === false) {
      this.startUp = null;
      this.isVisible = true;
      this.nameCtrl = this.fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
      this.legalAgentCtrl = this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]);
      this.coFoundersCtrl = this.fb.control('', Validators.required);
      this.descriptionCtrl = this.fb.control('', [Validators.required, Validators.maxLength(250)]);
      this.addressCtrl = this.fb.control('', Validators.maxLength(25));
      this.consultantCtrl = this.fb.control('', Validators.required);
      this.activityCtrl = this.fb.control('', [Validators.required, Validators.maxLength(10)]);
      this.startupForm = this.fb.group({
        name: this.nameCtrl,
        activity: this.activityCtrl,
        legalAgent: this.legalAgentCtrl,
        coFounders: this.coFoundersCtrl,
        description: this.descriptionCtrl,
        address: this.addressCtrl,
        consultant: this.consultantCtrl
      });
    } else {
      this.isVisible = false;
    }
  }

  isEditing(startup: StartUp) {
    this.isVisible = false;
    this.startUp = startup;
    this.setStartUp(startup);
  }

  setStartUp(startUp) {
    this.nameEditCtrl.setValue(startUp.name);
    this.legalAgentEditCtrl.setValue(startUp.legalAgent);
    this.coFoundersEditCtrl.setValue(startUp.coFounders);
    this.descriptionEditCtrl.setValue(startUp.description);
    this.addressEditCtrl.setValue(startUp.address);
    this.consultantEditCtrl.setValue(startUp.consultant.name);
    this.activityEditCtrl.setValue(startUp.activity);
  }

  register() {
    this.consultants.forEach(consultant => {
      if (this.consultantCtrl.value === consultant.name) {
        this.startupForm.value.consultant = consultant;
      }
    });
    this.storeService.addStartUp(this.startupForm.value as StartUp).subscribe(
      x => { this.startups.push(x) }
    );
    this.isVisible = false;
  }

  delete(startupId) {
    this.storeService.deleteStartup(startupId as number).subscribe(
      x => {
        for (let i = 0; i < this.startups.length; i++) {
          if (this.startups[i].id === startupId) {
            this.startups.splice(i, 1)
          }
        }
      }
    );
  }

  modify() {
    this.consultants.forEach(consultant => {
      if(this.consultantEditCtrl.value === consultant.name) {
        this.startupEditForm.value.consultant = consultant;
      }
    });
    this.startupEditForm.value.id = this.startUp.id;
    this.storeService.updateStartUp(this.startupEditForm.value as StartUp).subscribe(
      x => this.startUp = null,
      err => console.log("The observable making the update get an error : ", err),
      () => console.log("The startup is update ")
    )
    this.storeService.startUpList().subscribe(
      x => this.startups = x
    )
  }
}
