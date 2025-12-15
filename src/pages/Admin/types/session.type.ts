export type TSession = {
  _id: string;
  userTZ: string;
  providerTZ: string;
  subscription: Subscription;
  session_number: number;
  sessions_remaining: number;
  session_duration: number;
  status: string;
  scheduled_by: string;
  contact: Contact;
  retirement_snapshot: RetirementSnapshot;
  housing_equity: HousingEquity;
  dollarfar_planning: DollarfarPlanning;
  travel_planning: TravelPlanning;
  travel_purposes: string[];
  budget_estimates: BudgetEstimates;
  privacy_acknowledgements: PrivacyAcknowledgements;
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

export interface RetirementSnapshot {
  target_age: string;
  desired_income: string;
  estimated_savings: string;
}

export interface HousingEquity {
  estimated_home_equity: string;
  equity_comfort: string;
}

export interface DollarfarPlanning {
  calculators: string[];
  interpretation_toggle: boolean;
  consultation_time: string;
}

export interface TravelPlanning {
  months_abroad: string;
  start_timeline: string;
  travel_style: string;
  independent_travel_ack: boolean;
  country_region_interest: string;
  ideal_locations_interest: string;
}

export interface BudgetEstimates {
  home_spend_monthly: string;
  abroad_budget_season: string;
  flights_insurance_budget: string;
  flight_class: string;
}

export interface PrivacyAcknowledgements {
  ack_poc: boolean;
  consent_contact: boolean;
  ack_scope: boolean;
}
