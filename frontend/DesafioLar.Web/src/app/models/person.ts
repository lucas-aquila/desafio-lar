export interface Person {
    id: number;
    name: string;
    cpf: string;
    birthDate: string;
    isActive: boolean;
    phones: Phone[];
  }
  
  export interface Phone {
    id: number;
    type: PhoneType;
    number: string;
  }
  
  export enum PhoneType {
    Mobile = 0,
    Home = 1,
    Commercial = 2
  }