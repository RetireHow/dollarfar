/*=====================| Requested Plan Types |=================*/
export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  region?: string;
};
export type RetirementSnapshot = {
  target_age?: string;
  desired_income?: string;
  estimated_savings?: string;
};
export type HousingEquity = {
  estimated_home_equity?: string;
  equity_comfort?: string;
};
export type DollarFarPlanning = {
  calculators?: string[];
  interpretation_toggle?: boolean;
  name_pre?: string;
  email_pre?: string;
  phone_pre?: string;
  time_pre?: string;
  subscription_status?: "" | "have" | "start" | "paid";
  subscription_payment_intent?: string;
};
export type TravelPlanning = {
  months_abroad?: string;
  start_timeline?: string;
  travel_style?: string;
  independent_travel_ack?: boolean;
  country_region_interest?: string;
  ideal_locations_interest?: string;
};
export type BudgetEstimates = {
  home_spend_monthly?: string;
  abroad_budget_season?: string;
  flights_insurance_budget?: string;
  flight_class?: string;
};
export type PrivacyAcknowledgements = {
  ack_poc?: boolean;
  consent_contact?: boolean;
  ack_scope?: boolean;
};
export type TPlan = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  contact: ContactInfo;
  retirement_snapshot: RetirementSnapshot;
  housing_equity: HousingEquity;
  dollarfar_planning: DollarFarPlanning;
  travel_planning: TravelPlanning;
  budget_estimates: BudgetEstimates;
  travel_purposes: string[];
  privacy_acknowledgements: PrivacyAcknowledgements;
};
