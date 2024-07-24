import { defaultMemberData, defaultProperty, defaultStore } from "../defaultValues";

export const MockContext = {
  property: defaultProperty,
  setProperty: jest.fn(),
  store: defaultStore,
  setStore: jest.fn(),
  reset: jest.fn(),
  language: 'en',
  setLanguage: jest.fn(),
  organizationID: "",
  setOrganizationID: jest.fn(),
  memberData: defaultMemberData,
  setMemberData: jest.fn()
};
