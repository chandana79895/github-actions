import { InputAdornment, TextField, Typography, TypographyProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import check from "../assets/icons/check.svg";
import dropdown_down from "../assets/icons/dropdown_down.svg";
import dropdown_down_disabled from "../assets/icons/dropdown_down_disabled.svg";
import dropdown_up from "../assets/icons/dropdown_up.svg";
import { FC, useState } from "react";

type LabelledInputProps = {
  label: string;
  value: any;
  setValue: (value: any) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  inputProps?: any;
  className?: string;
  inputType?: "text" | "autocomplete"; // Change inputType options
  options?: { label: string; value: string }[];
  disabled?: boolean;
  headerVariant?: TypographyProps["variant"];
};

const LabelledInput: FC<LabelledInputProps> = ({
  label,
  value,
  placeholder,
  setValue,
  type,
  error,
  inputProps,
  className,
  inputType = "text",
  options = [],
  disabled,
  headerVariant = "h6",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={className}>
      <Typography variant={headerVariant}>{label}</Typography>
      {inputType === "text" ? (
        <TextField
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={({ target }) => setValue(target.value)}
          error={error}
          InputProps={inputProps}
          disabled={disabled}
        />
      ) : (
        <Autocomplete
          value={value || ""}
          onChange={(_, newValue) => setValue(newValue ?? "")}
          options={options}
          getOptionLabel={(option) => option.label}
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              error={error}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  value.value && <InputAdornment position="start">
                    <img src={check} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <img src={!disabled ? isFocused ? dropdown_up : dropdown_down : dropdown_down_disabled} />
                  </InputAdornment>
                ),
                ...inputProps,
              }}
            />
          )}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default LabelledInput;
