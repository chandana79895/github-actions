const ShortPath = {
  login: "LG",
  "location-search": "LS",
  "member-details": "MD",
  "member-search": "MS", 
  "qr-scan": "QS",
  receipt: "RC"
}

// returns the short path of the key
export const rsp = (key: string) => {
  return ShortPath[key];
}