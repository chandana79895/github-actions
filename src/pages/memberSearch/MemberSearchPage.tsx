import { useState } from "react";
import { Grid, InputAdornment } from "@mui/material";
import search from "../../assets/icons/search.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./MemberSearchPage.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";


function MemberSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [memberID, setMemberID] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMember = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/member-details")
    }, 2000);
  };

  const scanQRCode = () => {
    navigate("/qr-scan");
  };

  return (
    <div className="cards-container">
      <Card title={t("memberLookup")}>
        <Grid item xs={14} className="input-container pb-0">
          <Button title={t("scanQRCode")} onClick={scanQRCode} className="scan-button"/>
        </Grid>
      </Card>

      <Card>
        <Grid item xs={12}>
          <LabelledInput
            label={t("memberIDorCardNumber")}
            value={memberID}
            setValue={setMemberID}
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
          />
        </Grid>
        <Button
          title={t("search")}
          disabled={!memberID || loading}
          onClick={searchMember}
          loadingText={t("searching")}
          loading={loading}
        />
      </Card>
    </div>
  );
}

export default MemberSearchPage;
