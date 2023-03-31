export interface RegistrationSchema {
  _id: string;
  user: string;
  event: string;
  __v: number;
  eventDate: string;
  eventPrice: string;
  eventTitle: string;
  owner: string;
  userEmail: string;
  approved?: boolean;
}
