import { useState } from "react";
import { Grid, InputAdornment } from "@mui/material";
import search from "../../assets/icons/search.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card"; // Import the CustomCard component
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

function MemberSearchPage() {
  const navigate = useNavigate();
  const [memberID, setMemberID] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMember = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const scanQRCode = () => {
    navigate("/qr-scan");
  };

  return (
    <div className="cards-container">
      <Card title={t("memberLookup")}>
        <Grid item xs={12} className="input-container">
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

      <Card>
        <Grid item xs={12}>
          <Button title={t("scanQRCode")} onClick={scanQRCode} />
        </Grid>
      </Card>
    </div>
  );
}

export default MemberSearchPage;
