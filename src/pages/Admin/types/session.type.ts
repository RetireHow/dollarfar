export type TSession = {
  _id: string;
  slot:string;
  userTZ: string;
  userTZ_IANA: string;
  consultantTZ: string;
  consultantTZ_IANA: string;
  subscription: Subscription;
  session_number: number;
  sessions_remaining: number;
  session_duration: number;
  status: string;
  scheduled_by: string;
  contact: Contact;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface Subscription {
  _id: string;
  name: string;
  email: string;
  phone: string;
  paymentIntentId: string;
  amountPaid: number;
  currency: string;
  sessionsPurchased: number;
  sessionsUsed: number;
  expiryDate: string;
  status: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  region: string;
  country: string;
}
