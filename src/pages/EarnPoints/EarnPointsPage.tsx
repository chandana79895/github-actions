import { useEffect, useState, useContext } from "react";
import Card from "../../components/Card";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MemberCard from "@/components/MemberCard";
import { Modal } from "../../components/Modal";
import { AppContext } from "@/store/AppContext";
import { useNavigate } from "react-router";
import { getApi, headers } from "@/utils/api/http";
import { Endpoints } from "@/constants/endpoints";
import earnPointsFields from "@/constants/templates/earnPointsTemplate.json";
import { getWords } from "@/utils/words";
import { rsp } from "@/utils/shortPath";
import { Controller, useForm } from "react-hook-form";
import LabelledInput from "@/components/LabelledInput";
import Button from "@/components/Button";
import formatDate from "@/utils/helpers/dateFormatter";
import { yupResolver } from "@hookform/resolvers/yup";
import earnPointsSchema from "@/schemas/earnPoints";
import {
  numberFormatter,
  stringToNumber,
} from "@/utils/helpers/numberFormatter";
import {
  endLockAdornment,
  startYenAdornment,
} from "@/components/styles/adornments";
import { EarnPointsTemplateType } from "@/types/Types";

function EarnPointsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { property, store, language } = useContext(AppContext);
  const [memberData, setMemberData] = useState(null);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const storedMemberData = JSON.parse(localStorage.getItem("memberData"));
    if (storedMemberData) {
      setMemberData(storedMemberData);
    }
  }, []);

  const currentDateTime = new Date();
  const currentDate = formatDate(currentDateTime.toDateString(), "YYYY/MM/DD");
  const currentTime = currentDateTime.toLocaleTimeString("en-US", {
    hour12: false,
  });
  const memberCardData = {
    firstName: memberData?.firstName,
    lastName: memberData?.lastName,
    points: memberData?.loyaltyPoints,
    tier: memberData?.currentSlab,
    membershipID: memberData?.memberId,
    expiringPoints: memberData?.expiryPoints,
    pointsExpiryDate: formatDate(memberData?.pointsExpiryDate, "YYYY/MM/DD"),
    email: store.storeEmail,
    storeID: store.storeID,
    cardNumbers: memberData?.card_number ?? [],
  };

  const { control, handleSubmit, watch, setValue, trigger } = useForm({
    resolver: yupResolver(earnPointsSchema),
    context: { points: memberCardData.points },
    mode: "onChange",
  });

  const formValues = watch();

  // trigger goToPassPointsUsed validation if transactionAmount changes
  useEffect(() => {
    trigger("goToPassPointsUsed");
  }, [trigger, formValues.transactionAmount]);

  const onSubmit = async () => {
    setLoading(true);
    setError(false);

    try {
      const exceededValue =
        Number(formValues?.transactionAmount) > Number(store.storeThreshold);
      const payload = {
        identifierType: "external_id",
        identifierValue: memberData?.memberId,
        location: property?.value,
        billing_time: currentDate,
        gross_amount: Number(formValues?.transactionAmount),
        points: Number(formValues?.goToPassPointsUsed),
        notes: formValues?.notes,
        excedeedValue: exceededValue,
        storeEmail: store.storeEmail,
        slab: memberData?.currentSlab,
      };

      await getApi(Endpoints.earnPoints, payload, "POST_HEADER", headers)
        .then((response) => {
          setOpen(true);
          setMessage(
            t(response.data.keyValue)
              .replace(
                "_name",
                `${memberData?.firstName} ${memberData?.lastName}`
              )
              .replace("_points", response.data?.earnedPoints)
              .replace(
                "_remainingPoints",
                String(formValues?.goToPassPointsUsed)
              )
              .replace("_limit", String(store.storeThreshold))
          );
        })
        .catch((error) => {
          setOpen(true);
          setError(true);
          const errorText = error?.response?.data?.keyValue;
          setMessage(t(errorText));
        });
      setLoading(false);
    } catch (error) {
      setError(true);
      setOpen(true);
      setLoading(false);

      console.error("Error earning points:", error);
    }
  };

  //To click the cancel button in the form
  const handleCancel = () => {
    navigate("/member-search");
  };

  //To click the  modal  to close
  const handleModalClose = () => {
    setOpen(false);
    navigate("/member-search");
  };

  // update taxAssumedAmount when transactionAmount changes
  useEffect(() => {
    const taxAssumedAmount = numberFormatter(
      Math.floor(
        formValues.transactionAmount - formValues.transactionAmount / 1.1 || 0
      )
    );
    setValue("taxAssumedAmount", taxAssumedAmount);
  }, [formValues.transactionAmount, setValue]);

  // update amountEligibleForEarningPoints when dependencies change
  useEffect(() => {
    const taxAssumedAmountWithoutCommas = stringToNumber(
      formValues?.taxAssumedAmount || ""
    );
    const calculatedAmountEligible = Math.floor(
      formValues.transactionAmount -
        taxAssumedAmountWithoutCommas -
        +formValues.goToPassPointsUsed || 0
    );
    const amountEligible = numberFormatter(
      calculatedAmountEligible < 0 ? 0 : calculatedAmountEligible
    );
    setValue("amountEligibleForEarningPoints", amountEligible);
  }, [
    formValues.transactionAmount,
    formValues.taxAssumedAmount,
    formValues.goToPassPointsUsed,
    setValue,
  ]);

  // update location display value based on language
  useEffect(() => {
    setValue(
      "location",
      language === "English" ? property?.label : property?.label_jp
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const currentPage = rsp("earn-points");

  const setDefaultValue = (key: string) => {
    switch (key) {
      case "location":
        return language === "English" ? property?.label : property?.label_jp;
      case "date":
        return currentDate;
      case "time":
        return currentTime;
      default:
        return key;
    }
  };

  return (
    <div
      className="cards-container"
      id={currentPage + "CONT"}
      data-testid={currentPage + "CONT"}
    >
      <MemberCard
        firstName={memberCardData.firstName}
        lastName={memberCardData.lastName}
        {...memberCardData}
        expanded={expanded}
        setExpanded={setExpanded}
        testID={currentPage}
      />

      <Card
        title={t("earnPoints")}
        testID={currentPage + getWords("earnPoints")}
      >
        <Grid item xs={12} className="input-container pb-0">
          <Grid item xs={12} md={12}>
            <Typography variant={"h6"} className="txt-end">
              {`*${t("RequiredFields")}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {earnPointsFields.map((item, idx) => {
            return (
              <Grid item xs={item["grid-size"]} key={idx + item.key}>
                <Controller
                  name={item.key as EarnPointsTemplateType}
                  control={control}
                  defaultValue={setDefaultValue(item.defaultValue)}
                  render={({ field, fieldState }) => {
                    // adds lock adornment to disabled fields and yen adornment to transactionAmount and goToPassPointsUsed when value is present
                    const adornments =
                      (item.disabled &&
                        !item["display-only"] &&
                        endLockAdornment) ||
                      (item.inputType === "number" &&
                        field?.value &&
                        startYenAdornment);
                    return (
                      <LabelledInput
                        value={field.value as string}
                        setValue={field.onChange}
                        label={t(field.name)}
                        placeholder={t(item.placeholder)}
                        error={!!fieldState?.error?.message}
                        errorLabel={!!fieldState?.error?.message}
                        headerVariant="subtitle2"
                        testID={`${currentPage}${getWords(field.name)}`}
                        multiline={item.multiline}
                        inputType={item["display-only"] ? "none" : "text"}
                        textAlign={
                          item?.textAlign as "left" | "center" | "right"
                        }
                        disabled={item.disabled || loading}
                        required={item.required}
                        helperText={t(fieldState?.error?.message)?.replace(
                          "_points",
                          memberCardData?.points
                        )}
                        inputProps={adornments || {}}
                      />
                    );
                  }}
                />
              </Grid>
            );
          })}

          <Grid item xs={6}>
            <Button
              onClick={handleSubmit(onSubmit)}
              title={t("submit")}
              testID={currentPage + getWords("submit")}
              disabled={loading}
              loading={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              title={t("cancel")}
              testID={currentPage + getWords("cancel")}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </Card>

      {open && (
        <Modal
          open={open}
          onClose={handleModalClose}
          error={error}
          onClick={handleModalClose}
          buttonText={t("continue")}
          successText={t("success")}
          message={message}
          testID={currentPage + "MDL"}
        />
      )}
    </div>
  );
}

export default EarnPointsPage;
