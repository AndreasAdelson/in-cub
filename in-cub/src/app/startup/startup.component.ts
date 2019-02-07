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
  nameCtrl: FormControl;
  legalAgentCtrl: FormControl;
  coFoundersCtrl: FormControl;
  descriptionCtrl: FormControl;
  addressCtrl: FormControl;
  consultantCtrl: FormControl;
  activityCtrl: FormControl;
  startupForm: FormGroup;

  constructor(private storeService: StoreService, private fb: FormBuilder) { 
    this.nameCtrl = this.fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
    this.legalAgentCtrl =  this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]);
    this.coFoundersCtrl = this.fb.control('', Validators.required);
    this.descriptionCtrl = this.fb.control('',[Validators.required, Validators.maxLength(250)]);
    this.addressCtrl = this.fb.control('', Validators.maxLength(25));
    this.consultantCtrl = this.fb.control('', Validators.required);
    this.activityCtrl = this.fb.control('',[Validators.required, Validators.maxLength(10)]);
    this.startupForm = this.fb.group({
      name: this.nameCtrl,
      activity: this.activityCtrl,
      legalAgent: this.legalAgentCtrl,
      coFounders: this.coFoundersCtrl,
      description: this.descriptionCtrl,
      address: this.addressCtrl,
      consultant: this.consultantCtrl
    });
  }

  ngOnInit() {
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
    if(this.isVisible === false) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  register() {
    console.log(this.startupForm.value);
    console.log(this.startups);
    this.consultants.forEach(consultant => {
      if(this.consultantCtrl.value ===  consultant.name) {
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
        for(let i = 0; i < this.startups.length; i++){
          if(this.startups[i].id === startupId) {
            this.startups.splice(i, 1)
          }
        }
       }
    );
  }
}
