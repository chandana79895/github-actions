import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "@/store/AppContext";
import { getApi } from "@/api/utils/http";
import { Endpoints } from "@/api/const/endpoints";
import { getWords } from "@/constants/tests/words";
import { rsp } from "@/constants/tests/shortPath";

function LocationSearchPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const { property, setProperty, store, setStore } = useContext(AppContext);

  const payload = {
    "ngrok-skip-browser-warning": true,
    authorization:
      "Basic emFwY29tX3Rlc3Q6YmY2MDkwMmRiYjQxZjhjYTFhNGM4ZmQzMDQ1MmU2Yjg=",
  };
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await getApi(Endpoints.property, payload, "GET");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    setStore({ label: "", value: "" });
  }, [property, setStore]);

  useEffect(() => {
    if (property.value) {
      setProperty(property);
    }
    if (store.value) {
      setStore(store);
    }
  }, [property, setProperty, store, setStore]);

  const handleSubmit = () => {
    navigate("/member-search");
  };

  const locationOptions = locations?.map((item) => ({
    label: item.location,
    value: item.location,
  }));

  const entityOptions = property.value
    ? locations
        ?.find((item) => item.location === property.value)
        ?.entities.map((entity) => ({
          label: entity.property,
          value: entity.property,
        })) || []
    : [];

  const currentPage = rsp("location-search");

  return (
    <div
      className="cards-container"
      id={`${currentPage}CONT`}
      data-testid={`${currentPage}CONT`}
    >
      <Card
        title={t("chooseYourLocation")}
        testID={currentPage + getWords("chooseYourLocation")}
      >
        <Grid item xs={12} className="input-container">
          <LabelledInput
            label={t("lookupProperty")}
            value={property}
            inputType="autocomplete"
            setValue={setProperty}
            options={locationOptions}
            placeholder={t("enterPropertyName")}
            headerVariant="h5"
            testID={`${currentPage}${getWords("lookupProperty")}`}
          />
          <br />
          <LabelledInput
            label={t("selectStore")}
            value={store}
            inputType="autocomplete"
            setValue={setStore}
            options={entityOptions}
            placeholder={t("selectStore")}
            disabled={!property.value}
            headerVariant="h5"
            testID={`${currentPage}${getWords("selectStore")}`}
          />
        </Grid>
        <Button
          title={t("chooseLocation")}
          disabled={!property.value || !store.value || loading}
          onClick={handleSubmit}
          loadingText={t("loading")}
          testID={`${currentPage}${getWords("chooseLocation")}`}
        />
      </Card>
    </div>
  );
}

export default LocationSearchPage;
