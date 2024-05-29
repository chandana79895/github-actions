import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "@/store/AppContext";
// import { getApi } from "@/api/utils/http";
// import { Endpoints } from "@/api/const/endpoints";

function LocationSearchPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { property, setProperty, store, setStore } = useContext(AppContext);
  // const payload = {
  //   authorization:
  //     "Basic emFwY29tX3Rlc3Q6YmY2MDkwMmRiYjQxZjhjYTFhNGM4ZmQzMDQ1MmU2Yjg=",
  // };
  // const response = getApi(Endpoints.property, payload, "POST")
  // .then((e) => {
  //   console.log("e", e.data);
  // });
  const response = [
    {
      location: "Akasaka",
      entities: [
        {
          name: "HMH01101A_Akasaka Restaurant2",
          code: "demo.nascar.solutions4",
          property: "HMH01101 - MyStays Akasaka2",
        },
        {
          name: "HMH01101A_Akasaka Restaurant2",
          code: "demo.fortress.solution3",
          property: "HMH01101 - MyStays Akasaka2",
        },
        {
          name: "HMH01101A_Akasaka Restaurant",
          code: "demo.fortress.solution2",
          property: "HMH01101 - MyStays Akasaka",
        },
        {
          name: "HMH01101B_Akasaka Spa",
          code: "demo.fortress.solutions",
          property: "HMH01101 - MyStays Akasaka",
        },
        {
          name: "HMH01101B_Akasaka Spa2",
          code: "demo.fortress.solution4",
          property: "HMH01101 - MyStays Akasaka2",
        },
      ],
    },
    {
      location: "Akasaka2",
      entities: [
        {
          name: "HMH01101A_Akasaka Restaurant2",
          code: "demo.nascar.solutions4",
          property: "HMH01101 - MyStays Akasaka2 Secondary",
        },
        {
          name: "HMH01101A_Akasaka Restaurant2",
          code: "demo.fortress.solution3",
          property: "HMH01101 - MyStays Akasaka2 Secondary",
        },
        {
          name: "HMH01101A_Akasaka Restaurant",
          code: "demo.fortress.solution2",
          property: "HMH01101 - MyStays Akasaka Secondary",
        },
        {
          name: "HMH01101B_Akasaka Spa",
          code: "demo.fortress.solutions",
          property: "HMH01101 - MyStays Akasaka Secondary",
        },
        {
          name: "HMH01101B_Akasaka Spa2",
          code: "demo.fortress.solution4",
          property: "HMH01101 - MyStays Akasaka2 Secondary",
        },
      ],
    },
  ];
  useEffect(() => {
    setStore({ label: "", value: "" });
  }, [property]);

  console.log("Response", response);
  const handleSubmit = () => {
    // mock function to simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    navigate("/member-search");
  };

  const location = response.map((item) => ({
    label: item.location,
    value: item.location,
  }));

  // Update entity based on selected location
  const entity = property.value
    ? response
        .find((item) => item.location === property.value)
        ?.entities.map((entity) => ({
          label: entity.property,
          value: entity.property,
        }))
    : [];
  useEffect(() => {
    if (property.value) {
      setProperty(property);
    }
    if (store.value) {
      setStore(store);
    }
  }, []);

  return (
    <div className="cards-container">
      <Card title={t("chooseYourLocation")}>
        <Grid item xs={12} className="input-container">
          <LabelledInput
            label={t("lookupProperty")}
            value={property}
            inputType="autocomplete"
            setValue={setProperty}
            options={location}
            placeholder={t("enterPropertyName")}
            headerVariant="h5"
          />
          <br />
          <LabelledInput
            label={t("selectStore")}
            value={store}
            inputType="autocomplete"
            setValue={setStore}
            options={entity}
            placeholder={t("selectStore")}
            disabled={!property.value}
            headerVariant="h5"
          />
        </Grid>
        <Button
          title={t("chooseLocation")}
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
