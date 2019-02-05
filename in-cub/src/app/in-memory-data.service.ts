import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { StartUp, Consultant } from './store';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const startups = [
      new StartUp(1, "Cognimap", "R&D", "Barnabe", 1, "Une entreprise qui développe un systeme de trie automatique","2 rue de Supelec", new Consultant(1, "Andreas", "Adelson", "consultant depuis 10 ans")),
      new StartUp(2, "InfoTel", "R&D", "Karim", 0, "Une entreprise qui développe un systeme de gestion de données","2 avenue Pierre Donzelot", new Consultant(2, "David", "Tofigh", "consultant depuis 15 ans")),
      new StartUp(3, "Vitalis", "e-sante", "Malika", 2, "Une entreprise qui développe un systeme de mise en relation patient/medecin","2 impasse Jean-Yves Nepo", new Consultant(3, "Guillaume", "François", "consultant depuis 5 ans")),
      new StartUp(4, "Mamamiam", "R&D", "Rebecca", 3, "Une entreprise qui développe un systeme de mise en relation cuisto/particulier","2 rue de Kerlann", new Consultant(4, "Kevin", "Le Calvez", "consultant depuis 2 ans")),
      new StartUp(5, "HappyWait", "R&D", "Quentin", 5, "Une entreprise qui développe une application pour immobilier neuf","2 boulevard d'anjou", new Consultant(5, "Esteban", "Le Calvez", "consultant depuis 8 ans"))
    ]

    const consultants= [
      new Consultant(1, "Andreas", "Adelson", "consultant depuis 10 ans"),
      new Consultant(2, "David", "Tofigh", "consultant depuis 15 ans"),
      new Consultant(3, "Guillaume", "François", "consultant depuis 5 ans"),
      new Consultant(4, "Kevin", "Le Calvez", "consultant depuis 2 ans"),
      new Consultant(5, "Esteban", "Le Calvez", "consultant depuis 8 ans")
    ]

    return {startups, consultants}
  }

  genId<T extends StartUp | Consultant>(table: T[]): number {
    return table.length > 0 ? Math.max(...table.map(t => t.id)) + 1 : 11;
  }
  constructor() { }
}
