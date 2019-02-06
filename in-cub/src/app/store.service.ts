import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StartUp, Consultant } from './store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { 

  }
  startUpList() {
    return this.http.get(`/api/startups`);
  }

  addStartUp(startup: StartUp): Observable<StartUp> {
    return this.http.post<StartUp>(`/api/startups`, startup);
  }

  getStartUp(startupId : number) {
    return this.http.get(`/api/startups/${startupId}`);
  }

  deleteStartup(starupId: number) {
    return this.http.delete(`/api/startups/${starupId}`);
  }

  consultantList(){
    return this.http.get(`/api/consultants`);
  }

  addConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`/api/consultants`, consultant);
  }

  getConsultant(consultantId: number) {
    return this.http.get(`/api/consultants/${consultantId}`);
  }
}
