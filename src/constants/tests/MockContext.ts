export const MockContext = {
  property: { label: "", value: "" },
  setProperty: jest.fn(),
  store: { label: "", value: "" },
  setStore: jest.fn(),
  reset: jest.fn(),
  language: 'en',
  setLanguage: jest.fn(),
  organizationID: "",
  setOrganizationID: jest.fn(),
  memberData: {
    firstName: "",
    lastName: "",
    loyaltyPoints: 0,
    currentSlab: "",
    pointsExpiryDate: "",
    cardId: ""
  },
  setMemberData: jest.fn()
};
