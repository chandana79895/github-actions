import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "@/store/AppContext";
import { getApi } from "@/utils/api/http";
import { Endpoints } from "@/constants/endpoints";
import { getWords } from "@/utils/words";
import { rsp } from "@/utils/shortPath";
import { defaultStore } from "@/constants/defaultValues";

function LocationSearchPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [prevProperty, setPrevProperty] = useState(undefined);
  const navigate = useNavigate();
  const { property, setProperty, store, setStore } = useContext(AppContext);

  const payload = {
    "ngrok-skip-browser-warning": true,
    authorization:
      "Basic emFwY29tX3Rlc3Q6YmY2MDkwMmRiYjQxZjhjYTFhNGM4ZmQzMDQ1MmU2Yjg=",
  };
  const fetchLocations = async () => {
    if (!localStorage.getItem("fetchedLocations")) {
      try {
        setLoading(true);
        const response = await getApi(Endpoints.property, payload, "GET");
        localStorage.setItem("fetchedLocations", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    }
    setLocations(JSON.parse(localStorage.getItem("fetchedLocations")));
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (property.value) {
      if (property.value !== prevProperty) {
        setStore(defaultStore);
      }
      setPrevProperty(property.value);
      setProperty(property);
    }

    if (!property) {
      setStore(defaultStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property, setProperty, setStore]);

  useEffect(() => {
    setStore(store);
  }, [store, setStore]);

  const handleSubmit = () => {
    navigate("/member-search");
  };

  const locationOptions = locations?.map((item) => ({
    label: item.location,
    label_jp: item.location_jp || item.location,
    value: item.location,
  }));

  const entityOptions = property.value
    ? locations
        ?.find((item) => item.location === property.value)
        ?.entities.map((entity) => ({
          label: entity.property,
          label_jp: entity.property_jp || entity.property,
          value: entity.property,
          storeID: entity.storeID,
          storeThreshold: entity.storeThreshold,
          storeEmail: entity.storeEmail,
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
            noOptionsText={t(loading ? "loading" : "propertyNotFound")}
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
            noOptionsText={t(loading ? "loading" : "storeNotFound")}
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
