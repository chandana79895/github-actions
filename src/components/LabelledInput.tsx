import {
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { dropdownAdornment, startCheckAdornment } from "./styles/adornments";
import { AppContext } from "@/store/AppContext";

type OptionType = {
  label: string;
  label_jp: string;
  value: string;
};

type LabelledInputProps = {
  label: string;
  value: string | OptionType;
  setValue: (value) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  inputProps?: TextFieldProps["InputProps"];
  className?: string;
  inputType?: "text" | "autocomplete" | "none";
  options?: OptionType[];
  noOptionsText?: string;
  disabled?: boolean;
  headerVariant?: TypographyProps["variant"];
  required?: boolean;
  errorLabel?: boolean;
  multiline?: boolean;
  textClassName?: string;
  helperText?: string;
  testID?: string;
  textAlign?: "left" | "center" | "right";
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
  errorLabel,
  multiline,
  textClassName,
  helperText,
  testID = "",
  textAlign,
  noOptionsText,
}) => {
  const { language } = useContext(AppContext);
  const [isFocused, setIsFocused] = useState(false);
  const palette = useTheme().palette;
  const defaultFontSize = useTheme().typography.fontSize;
  const inputRef = useRef<HTMLInputElement>();
  const [fontSize, setFontSize] = useState(defaultFontSize);

  // Set the font size based on the length of the placeholder
  useEffect(() => {
    const setNewFontSize = () => {
      if (
        (!value || value === "" || value === null) &&
        language !== "English"
      ) {
        if (inputRef.current && inputRef.current.offsetWidth < 145) {
          setFontSize(12);
          return;
        }

        const length = placeholder.length;
        if (length > 20) {
          setFontSize(10);
        } else if (length > 14) {
          setFontSize(12);
        } else {
          setFontSize(defaultFontSize);
        }
      } else {
        setFontSize(defaultFontSize);
      }
    };

    setNewFontSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, language, placeholder]);

  const translatedOptionLabel = (option: OptionType) =>
    language === "English" ? option.label : option.label_jp;

  return (
    <div className={className}>
      <Typography
        variant={headerVariant}
        id={`${testID}LB`}
        data-testid={`${testID}LB`}
        color={errorLabel && palette.error.main}
        textAlign={textAlign}
        fontWeight={700}
        mb={headerVariant === "h5" && 1}
      >
        {label}
        {required && "*"}
      </Typography>
      {(() => {
        switch (inputType) {
          case "autocomplete":
            return (
              <Autocomplete
                value={value || ""}
                onChange={(_, newValue) => setValue(newValue ?? "")}
                options={options}
                getOptionLabel={(option) =>
                  translatedOptionLabel(option as OptionType)
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
                    {translatedOptionLabel(option as OptionType)}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    ref={inputRef}
                    placeholder={placeholder}
                    error={error}
                    id={`${testID}`}
                    key={testID}
                    inputProps={{
                      ...params.inputProps,
                      id: `${testID}IN`,
                      sx: { fontSize: fontSize },
                      "data-testid": `${testID}IN`,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      ...(typeof value !== "string" &&
                        value.value &&
                        startCheckAdornment(testID)),
                      ...dropdownAdornment(disabled, isFocused, testID),
                      ...inputProps,
                    }}
                  />
                )}
                disabled={disabled}
                data-testid={`${testID}DD`}
                id={`${testID}DD`}
                noOptionsText={noOptionsText}
              />
            );

          case "none":
            return (
              <Typography
                textAlign={textAlign}
                id={`${testID}DV`}
                data-testid={`${testID}DV`}
                borderTop={1}
                borderColor={palette.divider}
                px={2}
                sx={{ textWrap: "wrap" }}
              >
                ¥{typeof value === "string" && value}
              </Typography>
            );

          default:
            return (
              <TextField
                ref={inputRef}
                placeholder={placeholder}
                value={value}
                type={type}
                multiline={multiline}
                helperText={helperText}
                className={textClassName}
                onChange={({ target }) => setValue(target.value)}
                error={error}
                InputProps={{
                  ...inputProps,
                  sx: { fontSize: fontSize },
                }}
                disabled={disabled}
                data-testid={`${testID}`}
                id={`${testID}`}
                inputProps={{
                  id: `${testID}IN`,
                  "data-testid": `${testID}IN`,
                }}
                autoComplete="off"
              />
            );
        }
      })()}
    </div>
  );
};

export default LabelledInput;
