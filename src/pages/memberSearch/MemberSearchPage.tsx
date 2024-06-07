import { useState } from "react";
import { Grid, InputAdornment } from "@mui/material";
import search from "../../assets/icons/search.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./MemberSearchPage.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { rsp } from "@/constants/tests/shortPath";
import { getWords } from "@/constants/tests/words";


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

  const currentPage = rsp('member-search');
  const memberLookup = getWords('memberLookup');

  return (
    <div className="cards-container" id={`${currentPage}CONT`} data-testid={`${currentPage}CONT`}>
      <Card title={t("memberLookup")} testID={currentPage + memberLookup + '1'}>
        <Grid item xs={14} className="input-container pb-0">
          <Button
            title={t("scanQRCode")}
            onClick={scanQRCode}
            className="scan-button"
            testID={`${currentPage}${getWords('scanQRCode')}`}
          />
        </Grid>
      </Card>

      <Card testID={currentPage + memberLookup + '2'}>
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
            testID={`${currentPage}${getWords('memberIDorCardNumber')}`}
          />
        </Grid>
        <Button
          title={t("search")}
          disabled={!memberID || loading}
          onClick={searchMember}
          loadingText={t("searching")}
          loading={loading}
          testID={`${currentPage}${getWords('search')}`}
        />
      </Card>
    </div>
  );
}

export default MemberSearchPage;
