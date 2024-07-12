import { useEffect, useState, useContext } from "react";
import Card from "../../components/Card"; // Import the CustomCard component
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MemberCard from "@/components/MemberCard";
import FormLabel from "../../api/utils/FormLabel";
import { Modal } from "../../components/Modal";
import unlock from "../../assets/icons/unlock.svg";
import { AppContext } from "@/store/AppContext";
import { useNavigate } from "react-router";
import moment from "moment";
import { getApi, headers } from "@/api/utils/http";
import { Endpoints } from "@/api/const/endpoints";
import { transaction_amount } from "@/api/const/env";

interface applicationFieldsProps {
  fields: {}[];
}
function EarnPointsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { property } = useContext(AppContext);
  const [memberData, setMemberData] = useState(null);
  const [message, setMessage] = useState("");
  const [getApplicationFields, setApplicationFields] = useState<
    applicationFieldsProps | undefined
  >();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const storedMemberData = JSON.parse(localStorage.getItem("memberData"));
    if (storedMemberData) {
      setMemberData(storedMemberData);
    }
  }, []);

  const currentDateTime = new Date();
  const currentDate =
    currentDateTime.getDate() +
    "/" +
    (currentDateTime.getMonth() + 1) +
    "/" +
    currentDateTime.getFullYear();
  const currentTime =
    currentDateTime.getHours() +
    ":" +
    currentDateTime.getMinutes() +
    ":" +
    currentDateTime.getSeconds();

  //earn points default value
  const earnPoints = {
    location: property.label,
    date: currentDate,
    time: currentTime,
    transactionAmount: 0,
    taxAssumedAmount: 0,
    goToPassPointsUsed: 0,
    amountEligibleForEarningPoints: 0,
    notes: "",
  };
  const data = {
    firstName:memberData?.firstName,
    lastName: memberData?.lastName,
    points: memberData?.loyaltyPoints,
    tier: memberData?.currentSlab,
    membershipID: memberData?.cardId,
    expiringPoints: memberData?.loyaltyPoints,
    pointsExpiryDate: moment(memberData?.pointsExpiryDate).format("YYYY/MM/DD"),
  };

  // const messagesPopUp = [
  //   {
  //     id: 0,
  //     message: t("successfullySubmitted")
  //       .replace("_name", data.name)
  //       .replace("_points", "2000"),
  //     openMsg: true,
  //   },
  //   {
  //     id: 1,
  //     message: t("transactionApproval").replace("_name", data.name),
  //     openMsg: false,
  //   },
  //   {
  //     id: 2,
  //     message: t("successfullySpending")
  //       .replace("_name", data.name)
  //       .replace("_points", "16000")
  //       .replace("_remainingPoints", "200"),
  //     openMsg: false,
  //   },
  //   {
  //     id: 3,
  //     message: t("exceedsAmount")
  //       .replace("_name", data.name)
  //       .replace("¥_points", "2000"),
  //     openMsg: false,
  //   },
  // ];

  // const [messages, setMessages] = useState([]);

  //Page load to get the application fields
  useEffect(() => {
    getEarnPoints();
  }, [t]);

  //To get the application fields
  const getEarnPoints = async () => {
    const getFields = await applicationFormTemplate();
    setApplicationFields(getFields);
    // setMessages([...messagesPopUp]);
    // setMessage(message);
  };

  //creating Json For
  const applicationFormTemplate = () => {
    const finalFields = {
      fields: [
        {
          title: t("location"),
          type: "text",
          keyValue: "location",
          icon: true,
          formError: false,
          img: unlock,
          gridSizes: 12,
          disabled: true,
        },
        {
          title: t("date"),
          type: "text",
          keyValue: "date",
          disabled: true,
          required: false,
          gridSizes: 6,
          icon: true,
          formError: false,
          img: unlock,
        },
        {
          title: t("time"),
          type: "text",
          keyValue: "time",
          required: false,
          disabled: true,
          icon: true,
          img: unlock,
          formError: false,
          gridSizes: 6,
        },
        {
          title: t("transactionAmount"),
          type: "text",
          required: true,
          keyValue: "transactionAmount",
          formError: false,
          gridSizes: 6,
          currencyImgShow: true,
        },
        {
          title: t("taxAssumedAmount"),
          type: "notText",
          align: true,
          required: false,
          keyValue: "taxAssumedAmount",
          formError: false,
          gridSizes: 6,
        },
        {
          title: t("goToPassPointsUsed"),
          type: "text",
          keyValue: "goToPassPointsUsed",
          required: false,
          formError: false,
          gridSizes: 12,
          currencyImgShow: true,
        },
        {
          title: t("amountEligibleForEarningPoints"),
          type: "notText",
          align: false,
          required: false,
          keyValue: "amountEligibleForEarningPoints",
          gridSizes: 12,
          formError: false,
        },
        {
          title: t("notes"),
          type: "text",
          keyValue: "notes",
          required: false,
          gridSizes: 12,
          row: 4,
          formError: false,
          multiline: true,
        },
      ],
    };
    return finalFields;
  };

  //Click on the final submit
  const onSubmit = async (formValues) => {
    const exceedValue =
      Number(formValues.transactionAmount) > transaction_amount;
    const payload = {
      identifierType: "card_number",
      identifierValue: memberData.card_number,
      location: formValues.location,
      billing_time: currentDate,
      gross_amount: String(formValues.transactionAmount),
      points: formValues.goToPassPointsUsed,
      notes: formValues.notes,
      exceedValue: exceedValue,
    };

    try {
      const response = await getApi(
        Endpoints.earnPoints,
        payload,
        "POST_HEADER",
        headers
      );
      console.log("API Response:", response);

      if (response) {
        // if (response) {
        setOpen(true);
        // setMessage("Redemption Successful");
        // setMessage(response.data.error);
      } else {
        console.error("Failed to earn points:", response);
        setOpen(true);
        setError(true);
        setMessage(response.data.error);
      }
    } catch (error) {
      console.log("ERROR", error);
      setError(true);
      // setMessage(response.data.error);
      setOpen(true);

      console.error("Error earning points:", error);
    }
  };

  //To click the cancel button in the form
  const handleCancel = () => {
    navigate("/member-details");
  };

  //To click the  modal  to close
  const handleModalClose = () => {
    setOpen(false);
  };

  //to change the popup message in the modal popup
  // const handleSubmitPopUp = (itemId: number) => {
  //   const UpdatedId = itemId + 1;
  //   const updateMessage = messages.map((item) => {
  //     if (item.id == UpdatedId) {
  //       item.openMsg = true;
  //     } else {
  //       item.openMsg = false;
  //     }
  //     return item;
  //   });
  //   setMessages([...updateMessage]);
  //   if (messages.length == UpdatedId) {
  //     messages[0].openMsg = true;
  //     setMessages([...messages]);
  //     setOpen(false);
  //   }
  // };

  //Based on the textfield in form  values will be change
  const handleTaxAndEligbleAmount = (
    setValue: (updateText: string, value: string | number) => {},
    formKeyValues: string,
    value: any,
    UpdateValueText: any,
    getTextValues: any
  ) => {
    const { updateTextKey1, updateTextKey2 } = UpdateValueText;
    const { goToPassPointsUsed, transactionAmount, taxAssumedAmount } =
      getTextValues;
    switch (formKeyValues) {
      case "transactionAmount":
        // const taxAssumedAmountTotal = Number(value) / 1.1;
        const taxAssumedAmountTotal = Number(value) - Number(value) / 1.1;
        const amountEligible =
          Number(value) - taxAssumedAmountTotal - Number(goToPassPointsUsed);

        const amountEligibleNaNCheck =
          isNaN(amountEligible) || value == "" ? 0 : amountEligible;

        const taxAssumedAmountTotalNANCheck =
          isNaN(taxAssumedAmountTotal) || value == ""
            ? 0
            : taxAssumedAmountTotal;
        setValue(updateTextKey1, taxAssumedAmountTotalNANCheck);
        setValue(updateTextKey2, amountEligibleNaNCheck);
        break;
      case "goToPassPointsUsed":
        const amountEligibleEarn =
          Number(transactionAmount) - taxAssumedAmount - Number(value);
        setValue(updateTextKey2, amountEligibleEarn);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="cards-container">
        <MemberCard
          firstName={data.firstName}
          lastName={data.lastName}
          {...data}
          expandable
          expanded={expanded}
          setExpanded={setExpanded}
        />

        <Card title={t("earnPoints")}>
          <Grid item xs={12} className="input-container pb-0">
            <Grid item xs={12} md={12}>
              <Typography variant={"h6"} className="txt-end">
                {`*${t("RequiredFields")}`}
              </Typography>
            </Grid>
            {undefined !== getApplicationFields && (
              <FormLabel
                template={getApplicationFields}
                onSubmit={onSubmit}
                handleCancel={handleCancel}
                defaultValues={earnPoints}
                handleUpdateFields={handleTaxAndEligbleAmount}
              />
            )}
          </Grid>
        </Card>

        {open && (
          <Modal
            open={open}
            onClose={handleModalClose}
            error={error}
            onClick={handleModalClose}
            buttonText={t("continue")}
            errorText={message}
            successText={t("success")}
            successMessage={message}
          />
        )}
      </div>
    </>
  );
}

export default EarnPointsPage;
