import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  property: { label: string; value: string };
  setProperty: Dispatch<SetStateAction<{ label: string; value: string }>>;
  store: { label: string; value: string };
  setStore: Dispatch<SetStateAction<{ label: string; value: string }>>;
  reset: () => void;
  language?: string;
  setLanguage: (language: string) => void;
  organizationID?: string;
  setOrganizationID: Dispatch<SetStateAction<string>>;
  setemployeeID?: Dispatch<SetStateAction<string>>;
  employeeID?: string;
  memberData?: {
    firstName: string;
    lastName: string;
    loyaltyPoints: number;
    currentSlab: string;
    pointsExpiryDate: string;
    cardId: string;
  };
  setMemberData: Dispatch<SetStateAction<{
    firstName: string;
    lastName: string;
    loyaltyPoints: number;
    currentSlab: string;
    pointsExpiryDate: string;
    cardId: string;
  }>>;
}

export const AppContext = createContext<ContextType>({
  property: { label: "", value: "" },
  language: "",
  setProperty: () => {},
  store: { label: "", value: "" },
  setStore: () => {},
  setLanguage: () => {},
  reset: () => {},
  organizationID: "",
  setOrganizationID: () => {},
  employeeID: "",
  setemployeeID: () => {},
  memberData: {
    firstName: "",
    lastName: "",
    loyaltyPoints: 0,
    currentSlab: "",
    pointsExpiryDate: "",
    cardId: ""
  },
  setMemberData: () => {}
});
