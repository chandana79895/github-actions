export type Language = "English" | "日本語";

export type StoreType = {
  label: string;
  label_jp: string;
  value: string;
  storeID: string;
  storeThreshold: string;
  storeEmail: string;
};

export type MemberType = {
  firstName: string;
  lastName: string;
  loyaltyPoints: number;
  currentSlab: string;
  pointsExpiryDate: string;
  memberId: string;
};

export type PropertyType = {
  label: string;
  label_jp: string;
  value: string;
};

export type EarnPointsTemplateType =
  | "location"
  | "date"
  | "time"
  | "transactionAmount"
  | "taxAssumedAmount"
  | "goToPassPointsUsed"
  | "amountEligibleForEarningPoints"
  | "notes";
