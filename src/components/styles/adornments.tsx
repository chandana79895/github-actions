import { InputAdornment, Typography } from "@mui/material";
import check from "@/assets/icons/check.svg";
import dropdown_down from "@/assets/icons/dropdown_down.svg";
import dropdown_down_disabled from "@/assets/icons/dropdown_down_disabled.svg";
import dropdown_up from "@/assets/icons/dropdown_up.svg";
import unlock from "@/assets/icons/unlock.svg";
import search from "@/assets/icons/search.svg";

export function startCheckAdornment(testID) {
  return ({
    startAdornment:
      <InputAdornment position="start">
        <img
          src={check}
          data-testid={`${testID}DDSA`}
          id={`${testID}DDSA`}
        />
      </InputAdornment>
  })
}


export const dropdownAdornment = (disabled, isFocused, testID) => {
  let srcImage;
  if (!disabled) {
    srcImage = isFocused ? dropdown_up : dropdown_down;
  } else {
    srcImage = dropdown_down_disabled;
  }
  return ({
    endAdornment: (
      <InputAdornment position="start">
        <img
          src={srcImage}
          data-testid={`${testID}DDEA`}
          id={`${testID}DDEA`}
        />
      </InputAdornment>)
  })
};

export const endLockAdornment = {
  endAdornment: (
    <InputAdornment position="end">
      <img src={unlock} />
    </InputAdornment>
  )
};

export const startYenAdornment = {
  startAdornment: (
    <InputAdornment position="start">
      <Typography>¥</Typography>
    </InputAdornment>
  )
};

export const endSearchAdornment = {
  endAdornment: (
    <img src={search} />
  )
};