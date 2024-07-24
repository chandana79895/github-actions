import { useContext, useState } from "react";
import { Grid } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./MemberSearchPage.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { rsp } from "@/utils/shortPath";
import { getWords } from "@/utils/words";
import { getApi, headers } from "@/utils/api/http";
import { Endpoints } from "@/constants/endpoints";
import { AppContext } from "@/store/AppContext";
import { Modal } from "../../components/Modal";
import { endSearchAdornment } from "@/components/styles/adornments";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import memberSearchSchema from "@/schemas/memberSearch";
import { AxiosError } from "axios";

function MemberSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setMemberData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [fieldError, setFieldError] = useState(true);

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(memberSearchSchema),
    mode: "onChange",
  });

  const memberID = watch("memberID");

  const payload = {
    id: memberID,
    showPoints: true,
  };
  const searchMember = async () => {
    setLoading(true);
    try {
      const response = await getApi(
        Endpoints.getCustomer,
        payload,
        "GET_PARAMS",
        headers
      );
      const memberData = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        loyaltyPoints: response.data.loyaltyPoints,
        currentSlab: response.data.currentSlab,
        expiryPoints: response.data.expirySchedules.points,
        pointsExpiryDate: response.data.expirySchedules.expiryDate,
        memberId: response.data.memberId,
        card_number: response.data.cardNumber,
      };
      localStorage.setItem("memberData", JSON.stringify(memberData));
      setMemberData(memberData);
      if (memberData) navigate("/earn-points");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error fetching locations:",
          error,
          error?.response?.data
        );
        const errorTxt = error?.response?.data?.responseKey;
        setErrorText(t(errorTxt));
        setOpen(true);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const scanQRCode = () => {
    navigate("/qr-scan");
  };

  //To close the modal popup
  const handleModalClose = () => {
    setOpen(false);
  };

  const currentPage = rsp("member-search");
  const memberLookup = getWords("memberLookup");

  return (
    <div
      className="cards-container"
      id={`${currentPage}CONT`}
      data-testid={`${currentPage}CONT`}
    >
      <Card title={t("memberLookup")} testID={currentPage + memberLookup + "1"}>
        <Grid item xs={12} className="input-container pb-0">
          <Button
            title={t("scanQRCode")}
            onClick={scanQRCode}
            className="scan-button"
            testID={`${currentPage}${getWords("scanQRCode")}`}
          />
        </Grid>
      </Card>

      <Card testID={currentPage + memberLookup + "2"}>
        <Grid item xs={12}>
          <Controller
            name="memberID"
            control={control}
            render={({ field, fieldState }) => {
              setFieldError(!!fieldState?.error?.message);
              return (
                <LabelledInput
                  label={t("memberIDorCardNumber")}
                  value={field.value}
                  setValue={field.onChange}
                  placeholder={t("enterMemberIDorCardNumber")}
                  inputProps={endSearchAdornment}
                  headerVariant="h5"
                  className="mb-15px"
                  testID={`${currentPage}${getWords("memberIDorCardNumber")}`}
                  error={!!fieldState?.error?.message}
                  helperText={t(fieldState?.error?.message)}
                />
              );
            }}
          />
        </Grid>

        <Button
          title={t("search")}
          disabled={!memberID || fieldError || loading}
          onClick={handleSubmit(searchMember)}
          loadingText={t("searching")}
          loading={loading}
          testID={`${currentPage}${getWords("search")}`}
        />
      </Card>

      {open && (
        <Modal
          open={open}
          onClose={handleModalClose}
          error={error}
          onClick={handleModalClose}
          buttonText={t("tryAgain")}
          errorText={errorText}
          successText={t("error")}
        />
      )}
    </div>
  );
}

export default MemberSearchPage;
