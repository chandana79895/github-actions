const words = {
  English: "000",
  日本語: "001",
  username: "002",
  password: "003",
  login: "004",
  invalidUsernameorPassword: "005",
  enterEmployeeID: "006",
  enterPassword: "007",
  staffLogin: "008",
  loading: "009",
  chooseYourLocation: "010",
  lookupProperty: "011",
  enterPropertyName: "012",
  selectStore: "013",
  chooseLocation: "014",
  memberLookup: "015",
  memberIDorCardNumber: "016",
  enterMemberIDorCardNumber: "017",
  search: "018",
  searching: "019",
  scanQRCode: "020",
  tryAgain: "021",
  scanSuccess: "022",
  errorScanFailed: "023",
  earnPoints: "024",
  enterReceiptDetails: "025",
  validPoints: "026",
  currentTier: "027",
  membershipId: "028",
  pointsExpireOn: "029",
  accountIsLocked: "030",
  usernameMaxLength: "031",
  usernameNoSpace: "032",
  passwordMinLength: "033",
  pageNotFound: "034",
  location: "035",
  receiptID: "036",
  date: "037",
  time: "038",
  transactionAmount: "039",
  taxAssumedAmount: "040",
  goToPassPointsUsed: "041",
  amountEligibleForEarningPoints: "042",
  notes: "043",
  RequiredFields: "044",
  submit: "045",
  cancel: "046",
  success: "047",
  continue: "048",
  successTrxAndEarnedPoints: "049",
  transactionSuccessful: "050",
  successTrxAndPointsEarnedAndSpent: "051",
  transactionSuccessfullAndThreshold: "052",
  sessionTimedOut: "053",
  pleaseLoginToContinue: "054",
  transactionAmountValidation: "055",
  scanQRFailed: "056",
  manualLookup: "057",
  noUserFound: "058",
  memberNotFound: "059",
  scanFailed: "060",
  Silver: "061",
  MemberLookup: "062",
  SelectLocation: "063",
  LanguagePreference: "064",
  Logout: "065",
  enterAmount: "066",
  enterGoToPassPointsUsed: "067",
  gold: "068",
  platinum: "069",
  locationMandatory: "070",
  validAmount: "071",
  amountExceed: "072",
  currentPoints: "073",
  passPoints: "074",
  inputExceededLimit: "075",
  cardNumbers: "076",
  propertyNotFound: "077",
  storeNotFound: "078",
  pointsRedemption: "079",
  amountNotWholeNumber: "080",
  pointsNotWholeNumber: "081",
}; //NOTE: append the newer keys to the end of the above object to prevent breaking the tests

// return the position of the above given key
export const getWords = (key) => {
  const index = Object.keys(words).indexOf(key);
  if (index === -1) return undefined;
  return words[key];
};