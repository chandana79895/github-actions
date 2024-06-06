//NOTE: append the newer keys to the end of the below object to prevent breaking the tests

const words = {
  "English": "en",
  "Japanese": "jp",
  "username": "uname",
  "password": "Pass",
  "login": "Login",
  "invalidUsernameorPassword": "Invalid",
  "enterEmployeeID": "Enter Employee ID",
  "enterPassword": "Enter Password",
  "staffLogin": "Staff Login",
  "loading": "Loading",
  "chooseYourLocation": "Choose your location",
  "lookupProperty": "Lookup Property",
  "enterPropertyName": "Enter property name",
  "selectStore": "Select Store",
  "chooseLocation": "Choose Location",
  "memberLookup": "Member Lookup",
  "memberIDorCardNumber": "Member ID or Card Number",
  "enterMemberIDorCardNumber": "Enter Member ID or Card Number",
  "search": "Search",
  "searching": "Searching",
  "scanQRCode": "Scan QR Code",
  "tryAgain": "Try again",
  "scanSuccess": "Scan Success",
  "errorScanFailed": "Error: Scan Failed",
  "earnPoints": "Earn Points",
  "enterInformationDirectly": "Enter Information Directly",
  "validPoints": "Valid Points",
  "currentTier": "Current Tier",
  "membershipId": "Membership ID",
  "pointsExpireon": "Points Expire on",
  "accountIsLocked": "Your account is locked. Ask your manager for unlock the account.",
  "usernameMaxLength": "Username must be less than 50 characters",
  "usernameNoSpace": "Username must not contain any spaces",
  "passwordMinLength": "Password must be at least 8 characters",
  "pageNotFound": "Oops! Page not found."
}//NOTE: append the newer keys to the end of the above object to prevent breaking the tests


// return the position of the above given key
export const getWords = (key) => {
  const index = Object.keys(words).indexOf(key);
  if (index === -1)
    return undefined;
  return ("000" + index).slice(-3);
}