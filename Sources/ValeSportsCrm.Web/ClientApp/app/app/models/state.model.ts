export interface IHaveId {
    id: number;
}

export interface IMessage {
    header: string;
    message: string;
}

export interface ICustomer extends IHaveId {
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phone: string;
    email: string;
    //sports: string[];
    //familyMembers: ICustomer[];
}

export interface IUser extends IHaveId {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    phone: string;
    email: string;
    role: string;
}

export interface IProgram extends IHaveId {
    name: string;
    type: ProgramType;
    startDate: string;
    endDate: string;
    price: number;
    //customers: ICustomer[];
}

export enum ProgramType {
    Camps,
    Clinics,
    Leagues,
    OpenPlay,
    PrimaryTeam
}
