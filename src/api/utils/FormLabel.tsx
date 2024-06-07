import { Grid, InputAdornment, Typography, useTheme } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import schema from "../../pages/EarnPoints/FormSchema";
// import { string } from "yup";

function FormLabel({ template, onSubmit,handleCancel,defaultValues, handleUpdateFields }) {
  const { t } = useTranslation();
  const palette = useTheme().palette;
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });
  
  const { fields } = template;

  //To change the fields in the form this function will execute
  const updateFieldValue = (formkeyValues: string, value: any) => {
    const UpdateValueText = {
      updateTextKey1: "taxAssumedAmount",
      updateTextKey2: "amountEligibleForEarningPoints",
    };
    const getTextValues = getValues();
    handleUpdateFields(
      setValue,
      formkeyValues,
      value,
      UpdateValueText,
      getTextValues 
    );
  };

  //To change the Error Message based on the language
  const translateHelperText = (value) => {
    const requiredFields = value?.message;
    const translateText = t(requiredFields);
    return translateText;
  };

  //It will render alll the fields in page load
  const renderFields = (fields: any) => {
    return fields.map((field: any) => {
      const {
        type,
        title,
        gridSizes,
        disabled,
        icon,
        img,
        keyValue,
        multiline,
        align,
        currencyImgShow,
        required,
      } = field;
      const showingLockIcon = icon && {
        endAdornment: (
          <InputAdornment position="start">
            <img src={img} />
          </InputAdornment>
        ),
      };

      const currencyimageShowing = currencyImgShow && {
        startAdornment: (
          <Typography
            variant={"h6"}
            color={palette.text.primary}
            id={"JPRuppeeTyL"}
            data-testid={"JPRuppeeTyL"}
          >
            ¥
          </Typography>
        ),
      };
      return (
        <Grid item xs={gridSizes} md={gridSizes} key={title}>
          <Controller
            control={control}
            name={keyValue}
            render={({ field: { onChange, value, name } }) => (
              <>
                {type == "text" ? (
                  <LabelledInput
                    label={title}
                    error={!!errors[name]}
                    formError={!!errors[name]}
                    testID={`${keyValue}_id`}
                    disabled={disabled}
                    keyValue={keyValue}
                    value={value}
                    required={required}
                    setValue={onChange}
                    formUpdateField={true}
                    updateFieldValue={updateFieldValue}
                    multiline={multiline}
                    inputProps={showingLockIcon || currencyimageShowing}
                    helperText={
                      errors[name] ? translateHelperText(errors[name]) : ""
                    }
                  />
                ) : (
                  <>
                    <Typography
                      variant={"h6"}
                      className={align && "txt-cntr"}
                      id={`${keyValue}TyT`}
                      data-testid={`${keyValue}TyT`}
                    >
                      {title}
                    </Typography>
                    <hr className="mar-top" />
                    <Typography
                      variant={"h6"}
                      className={align && "txt-cntr"}
                      id={`${keyValue}TyV`}
                      data-testid={`${keyValue}TyV`}
                    >
                      ¥{isNaN(value) ? 0 : Math.floor(value)}
                    </Typography>
                  </>
                )}
              </>
            )}
          />
        </Grid>
      );
    });
  };
  

  return (
    <div className="form-container" data-testid="earnpoints_Id">
      <div className="grid-container">
        <Grid container spacing={2}>
          {renderFields(fields)}
        </Grid>
        <br />

        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Button
              title={t("submit")}
              onClick={handleSubmit(onSubmit)}
              testID={"btn-form-submit"}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              title={t("cancel")}
              onClick={()=>handleCancel(reset())}
              variant={"outlined"}
              testID={"btn-form-cancel"}
            />
          </Grid>
        </Grid>
      </div>
      <br />
    </div>
  );
}
export default FormLabel;
