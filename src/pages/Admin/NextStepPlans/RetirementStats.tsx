import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetAllConsultationSessoinsQuery } from "../../../redux/features/APIEndpoints/consultationSessionApi/consultationSessionApi";
import { useGetAllRetirementPlansQuery } from "../../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";
import { useGetAllActiveConsultationSubscriptionsQuery } from "../../../redux/features/APIEndpoints/consultationSubscriptionApi/consultationSubscription";

// Types (kept as provided)
export type TSession = {
  _id: string;
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
}

export interface DollarfarPlanning {
  calculators: string[];
  interpretation_toggle: boolean;
  consultation_time: string;
}

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

export type SubscriptionStatus = "active" | "expired" | "used" | "cancelled";

// For creating a new subscription
export type TConsultationSubscription = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  paymentIntentId: string;
  amountPaid?: number;
  currency?: string;
  sessionsPurchased?: number;
  sessionsUsed?: number;
  purchaseDate?: Date;
  expiryDate: Date;
  status?: SubscriptionStatus;
};

function RetirementStatsSkeleton() {
  return (
    <section className="space-y-6 mb-10">
      {/* Primary Stats Row - Now 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Retirement Plans Card Skeleton */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
        </div>

        {/* Consultation Sessions Card Skeleton */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
        </div>

        {/* Active Subscriptions Card Skeleton */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
        </div>
      </div>

      {/* Secondary Stats Row - Now 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Session Timeline Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex items-baseline gap-6 mt-3">
                <div className="text-center space-y-2">
                  <div className="h-10 w-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-10 w-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-10 w-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded ml-4"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Session Utilization Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded ml-4"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
              <div className="text-center space-y-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RetirementStats() {
  const { data: planData, isLoading: plansLoading } =
    useGetAllRetirementPlansQuery(undefined);
  const retirementPlans: TPlan[] = planData?.data || [];

  const { data: sessionData, isLoading: sessionsLoading } =
    useGetAllConsultationSessoinsQuery(undefined);
  const bookedSessions: TSession[] = sessionData?.data || [];

  const { data: subscriptionData, isLoading: subscriptionsLoading } =
    useGetAllActiveConsultationSubscriptionsQuery(undefined);
  const activeSubscriptions: TConsultationSubscription[] =
    subscriptionData?.data || [];

  // Calculate derived metrics
  const now = new Date();

  // Calculate upcoming sessions using consultation_time
  const upcomingSessions = bookedSessions?.filter((session) => {
    const consultationTime = session.dollarfar_planning?.consultation_time;
    if (!consultationTime) return false;

    const scheduledTime = new Date(consultationTime);
    return scheduledTime > now;
  }).length;

  // Calculate completed/past sessions
  const completedSessions = bookedSessions?.filter((session) => {
    const consultationTime = session.dollarfar_planning?.consultation_time;
    if (!consultationTime) return false;

    const scheduledTime = new Date(consultationTime);
    return scheduledTime <= now;
  }).length;

  // Calculate sessions happening today
  const todaySessions = bookedSessions?.filter((session) => {
    const consultationTime = session.dollarfar_planning?.consultation_time;
    if (!consultationTime) return false;

    const scheduledTime = new Date(consultationTime);
    const today = new Date();
    return scheduledTime.toDateString() === today.toDateString();
  }).length;

  const totalPurchasedSessions = activeSubscriptions?.reduce(
    (total, sub) => total + (sub.sessionsPurchased || 0),
    0
  );

  const totalUsedSessions = activeSubscriptions?.reduce(
    (total, sub) => total + (sub.sessionsUsed || 0),
    0
  );

  const sessionUtilizationRate = totalPurchasedSessions
    ? Math.round((totalUsedSessions / totalPurchasedSessions) * 100)
    : 0;

  const recentPlans = retirementPlans?.filter(
    (plan) =>
      new Date(plan.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  // Calculate average session duration
  const averageSessionDuration = bookedSessions?.length
    ? Math.round(
        bookedSessions?.reduce(
          (acc, session) => acc + (session.session_duration || 0),
          0
        ) / bookedSessions.length
      )
    : 0;

  // Calculate scheduled sessions for next 7 days
  const nextWeekSessions = bookedSessions?.filter((session) => {
    const consultationTime = session.dollarfar_planning?.consultation_time;
    if (!consultationTime) return false;

    const scheduledTime = new Date(consultationTime);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return scheduledTime > now && scheduledTime <= nextWeek;
  }).length;

  // Show skeleton if any data is loading
  if (plansLoading || sessionsLoading || subscriptionsLoading) {
    return <RetirementStatsSkeleton />;
  }

  return (
    <section className="space-y-6 mb-10">
      {/* Primary Stats Row - Now 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Retirement Plans Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Retirement Plans
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {retirementPlans?.length || 0}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
                <Icon icon="mdi:trending-up" className="text-lg" />
                {recentPlans || 0} this week
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <Icon
                icon="mdi:clipboard-text-outline"
                className="text-3xl text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Total retirement planning submissions
          </p>
        </div>

        {/* Consultation Sessions Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Sessions Booked
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {bookedSessions?.length || 0}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2 flex items-center gap-1">
                <Icon icon="mdi:calendar-clock" className="text-lg" />
                {upcomingSessions || 0} upcoming
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <Icon
                icon="mdi:calendar-check"
                className="text-3xl text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            {completedSessions || 0} completed • {todaySessions || 0} today
          </p>
        </div>

        {/* Active Subscriptions Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Active Subscriptions
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {activeSubscriptions?.length || 0}
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-2">
                {sessionUtilizationRate}% utilization
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <Icon
                icon="mdi:account-cash"
                className="text-3xl text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            {totalPurchasedSessions || 0} total sessions purchased
          </p>
        </div>
      </div>

      {/* Secondary Stats Row - Now 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Session Timeline Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Session Timeline
              </p>
              <div className="flex items-baseline gap-6 mt-3">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {upcomingSessions || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Upcoming
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {todaySessions || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Today
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {nextWeekSessions || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Next 7 days
                  </p>
                </div>
              </div>
            </div>
            <Icon
              icon="mdi:timeline-clock"
              className="text-2xl text-gray-500 dark:text-gray-400"
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">
                {averageSessionDuration || 0} min
              </span>{" "}
              average session duration
            </p>
          </div>
        </div>

        {/* Session Utilization Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Session Utilization
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {totalUsedSessions || 0}/{totalPurchasedSessions || 0}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Usage Progress
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {sessionUtilizationRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${sessionUtilizationRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <Icon
              icon="mdi:progress-clock"
              className="text-2xl text-green-500 dark:text-green-400 ml-4"
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Purchased
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {totalPurchasedSessions || 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Used
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {totalUsedSessions || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
