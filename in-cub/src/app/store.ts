export class StartUp {
    id: number;
    name: string;
    activity: string;
    legalAgent: string;
    coFounders: number;
    description: string;
    address?: string;
    consultant?: Consultant

    constructor(id: number, name: string, activity: string, legalAgent: string, coFounders: number, description: string, address?: string, consultant?: Consultant) {
        this.id = id;
        this.name = name;
        this.activity = activity;
        this.legalAgent = legalAgent;
        this.coFounders = coFounders;
        this.description = description;
        this.address = address;
        this.consultant = consultant;
    }
}

export class Consultant {
    id: number;
    name: string;
    lastName: string;
    description: string;

    constructor(id: number, name: string, lastName: string, description: string){
        this.id = id;
        this.name = name;
        this.lastName =lastName;
        this.description = description;
    }
}