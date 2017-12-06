export interface IMessage {
    header: string;
    message: string;
}

export interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phone: string;
    email: string;
    sports: string[];
    photoUrl: string;
    familyMembers: ICustomer[];
}

export interface IProgram {
    id: string;
    name: string;
    type: ProgramType;
    startDate: string;
    endDate: string;
    price: number;
    customers: ICustomer[];
}

export enum ProgramType {
    Camps,
    Clinics,
    Leagues,
    OpenPlay,
    PrimaryTeam
}
