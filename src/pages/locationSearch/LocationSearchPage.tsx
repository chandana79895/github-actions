import { useState } from "react";
import { Grid } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card"; // Import the CustomCard component
import { useTranslation } from "react-i18next";

function LocationSearchPage() {
  const { t } = useTranslation();
  const [property, setProperty] = useState({ label: "", value: "" });
  const [store, setStore] = useState({ label: "", value: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => { // mock function to simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // dummy values for the property autocomplete, to be replaced with api
  const dummyProperty = [
    'MyStays Akasaka',
    'MyStays Premier Akasaka',
    'MyStays Aomori Station',
    'MyStays Atsugi',
  ].map((item) => ({ label: item, value: item }));

  // dummy values for the store autocomplete, to be replaced with api
  const dummyStore = [
    'MyStays Restaurant',
    'MyStays Gift Shop',
    'MyStays Spa',
  ].map((item) => ({ label: item, value: item }));

  return (
    <div className="cards-container">
      <Card title={t('chooseYourLocation')}>
        <Grid item xs={12} className="input-container">
          <LabelledInput
            label={t("lookupProperty")}
            value={property}
            inputType="autocomplete"
            setValue={setProperty}
            options={dummyProperty}
            placeholder={t("enterPropertyName")}
            headerVariant="h5"
          />
          <br />
          <LabelledInput
            label={t('selectStore')}
            value={store}
            inputType="autocomplete"
            setValue={setStore}
            options={dummyStore}
            placeholder={t('selectStore')}
            disabled={!property.value}
            headerVariant="h5"
          />
        </Grid>
        <Button
          title={t('chooseLocation')}
          disabled={!property.value || !store.value || loading}
          onClick={handleSubmit}
          loadingText={t("loading")}
          loading={loading}
        />
      </Card>
    </div>
  );
}

export default LocationSearchPage;
