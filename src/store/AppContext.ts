import { createContext, Dispatch, SetStateAction } from "react";
import { MemberType, PropertyType, StoreType } from "@/types/Types";
import { defaultMemberData, defaultProperty, defaultStore } from "@/constants/defaultValues";

interface ContextType {
  property: PropertyType;
  setProperty: Dispatch<SetStateAction<PropertyType>>;
  store: StoreType;
  setStore: Dispatch<SetStateAction<StoreType>>;
  reset: () => void;
  language?: string;
  setLanguage: (language: string) => void;
  organizationID?: string;
  setOrganizationID: Dispatch<SetStateAction<string>>;
  setemployeeID?: Dispatch<SetStateAction<string>>;
  employeeID?: string;
  memberData?: MemberType;
  setMemberData: Dispatch<SetStateAction<MemberType>>;
}

export const AppContext = createContext<ContextType>({
  property: defaultProperty,
  language: "",
  setProperty: () => {},
  store: defaultStore,
  setStore: () => {},
  setLanguage: () => {},
  reset: () => {},
  organizationID: "",
  setOrganizationID: () => {},
  employeeID: "",
  setemployeeID: () => {},
  memberData: defaultMemberData,
  setMemberData: () => {},
});
