import { PhoneType } from './person';

export interface RequestPerson {
  name: string;
  cpf: string;
  birthDate: string;
  phones: RequestPhone[];
}

export interface RequestPhone {
  type: PhoneType;
  number: string;
}