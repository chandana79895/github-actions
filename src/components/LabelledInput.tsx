import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  useTheme
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import check from "../assets/icons/check.svg";
import dropdown_down from "../assets/icons/dropdown_down.svg";
import dropdown_down_disabled from "../assets/icons/dropdown_down_disabled.svg";
import dropdown_up from "../assets/icons/dropdown_up.svg";
import { FC, useState } from "react";

type LabelledInputProps = {
  label: string;
  value: string | { label: string; value: string };
  setValue: (value) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  inputProps?: TextFieldProps["InputProps"];
  className?: string;
  inputType?: "text" | "autocomplete" ; // Change inputType options
  options?: { label: string; value: string }[];
  disabled?: boolean;
  headerVariant?: TypographyProps["variant"];
  required?: boolean;
  keyValue?: string;
  formError?: boolean;
  defaultValue?: string | number;
  multiline?: boolean;
  textClassName?: string;
  updateFieldValue?: (formkeyValues: string, value: any) => void;
  helperText?: string;
  testID?: string;
  formUpdateField?: boolean;
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
  required,
  keyValue,
  formError,
  defaultValue,
  multiline,
  textClassName,
  updateFieldValue,
  helperText,
  testID = "",
  formUpdateField,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const palette = useTheme().palette;

  return (
    <div className={className}>
      <Typography
        variant={headerVariant}
        id={`${testID}LB`}
        data-testid={`${testID}LB`}
        color={formError && palette.error.main}
      >
        {label}
        {required && "*"}
      </Typography>
      {inputType === "text" ? (
        <TextField
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          type={type}
          multiline={multiline}
          helperText={helperText}
          className={textClassName}
          onChange={(e) => {
            setValue(e.target.value);
            {
              formUpdateField && updateFieldValue(keyValue, e.target.value);
            }
          }}
          error={error}
          InputProps={inputProps}
          disabled={disabled}
          data-testid={`${testID}`}
          id={`${testID}`}
          inputProps={{ id: `${testID}IN`, "data-testid": `${testID}IN` }}
        />
      ) : (
        <Autocomplete
          value={value || ""}
          onChange={(_, newValue) => setValue(newValue ?? "")}
          options={options}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.label
          }
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          renderOption={(
            props,
            option //required to add data-testid and id to the options
          ) => (
            <li
              key={testID + props["data-option-index"] + "00"}
              {...props}
              data-testid={`${testID}OP${props["data-option-index"]}`}
              id={`${testID}OP${props["data-option-index"]}`}
            >
              {typeof option === "string" ? option : option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              error={error}
              id={`${testID}`}
              key={testID}
              inputProps={{
                ...params.inputProps,
                id: `${testID}IN`,
                "data-testid": `${testID}IN`,
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: typeof value !== "string" && value.value && (
                  <InputAdornment position="start">
                    <img
                      src={check}
                      data-testid={`${testID}DDSA`}
                      id={`${testID}DDSA`}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={
                        !disabled
                          ? isFocused
                            ? dropdown_up
                            : dropdown_down
                          : dropdown_down_disabled
                      }
                      data-testid={`${testID}DDEA`}
                      id={`${testID}DDEA`}
                    />
                  </InputAdornment>
                ),
                ...inputProps,
              }}
            />
          )}
          disabled={disabled}
          data-testid={`${testID}DD`}
          id={`${testID}DD`}
        />
      )}
    </div>
  );
};

export default LabelledInput;
