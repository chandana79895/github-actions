import { useContext, useState } from "react";
import { Grid, InputAdornment } from "@mui/material";
import search from "../../assets/icons/search.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./MemberSearchPage.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { rsp } from "@/constants/tests/shortPath";
import { getWords } from "@/constants/tests/words";
import { getApi, headers } from "@/api/utils/http";
import { Endpoints } from "@/api/const/endpoints";
import { AppContext } from "@/store/AppContext";
import { Modal } from "../../components/Modal";

function MemberSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const { setMemberData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const payload = {
    id: memberId,
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
        cardId: response.data.cardId,
        card_number: response.data.cardNumber,
      };
      localStorage.setItem("memberData", JSON.stringify(memberData));
      setMemberData(memberData);
      if (memberData) navigate("/member-details");
    } catch (err: unknown) {
      const error = err as any;
      console.error("Error fetching locations:", error, error.response?.data);
      let errorTxt = error.response?.data?.responseKey;
      setErrorText(t(errorTxt));
      setOpen(true);
      setError(true);
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
        <Grid item xs={14} className="input-container pb-0">
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
          <LabelledInput
            label={t("memberIDorCardNumber")}
            value={memberId}
            setValue={setMemberId}
            placeholder={t("enterMemberIDorCardNumber")}
            inputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <img src={search} alt="member search" />
                </InputAdornment>
              ),
            }}
            headerVariant="h5"
            className="mb-15px"
            testID={`${currentPage}${getWords("memberIDorCardNumber")}`}
          />
        </Grid>
        <Button
          title={t("search")}
          disabled={!memberId || loading}
          onClick={searchMember}
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
