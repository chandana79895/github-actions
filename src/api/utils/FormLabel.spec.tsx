import { render, screen, fireEvent } from "@testing-library/react";
import FormLabel from "./FormLabel";

describe("Form Component Renderer", () => {
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
  //check we need to placed default values in the particular place
  test("renders default values showing", async () => {
    const finalFields = {
      fields: [
        {
          title: "location",
          type: "text",
          keyValue: "location",
          icon: true,
          formError: false,
          gridSizes: 12,
          disabled: true,
        },
        {
          title: "date",
          type: "text",
          keyValue: "date",
          disabled: true,
          gridSizes: 6,
          icon: true,
          formError: false,
        },
        {
          title: "time",
          type: "text",
          keyValue: "time",
          disabled: true,
          gridSizes: 6,
          icon: true,
          formError: false,
        },
      ],
    };
    const earnPoints = {
      location:"Akasaka",
      date: currentDate,
      time: currentTime,
      transactionAmount: 0,
      taxAssumedAmount: 0,
      goToPassPointsUsed: 0,
      amountEligibleForEarningPoints: 0,
      notes: "",
    };
    const { getByTestId } = render(
      <FormLabel
        template={finalFields}
        onSubmit={() => {}}
        handleCancel={() => {}}
        defaultValues={earnPoints}
        handleUpdateFields={() => {}}
      />
    );

    const locationText = screen.getByRole("heading", {
      name: /location/i,
    });
    expect(locationText).toBeInTheDocument();

    const locationValueId = getByTestId("location_id").querySelector("input");
    expect(locationValueId).toHaveValue("Akasaka");

    const dateText = screen.getByRole("heading", {
      name: /date/i,
    });
    expect(dateText).toBeInTheDocument();
    const dateId = getByTestId("date_id").querySelector("input");
    expect(dateId).toHaveValue(currentDate);

    const timeText = screen.getByRole("heading", {
      name: /time/i,
    });
    expect(timeText).toBeInTheDocument();
    const timeId = getByTestId("time_id").querySelector("input");
    expect(timeId).toHaveValue(currentTime);
  });

  test("renders value change in form",async () => {
    const finalFields = {
      fields: [
        {
          title: "Transaction Amount",
          type: "text",

          required: true,
          keyValue: "transactionAmount",
          formError: false,
          gridSizes: 6,
        },
        {
          title: "Tax assumed amount",
          type: "notText",
          align: true,

          required: false,
          keyValue: "taxAssumedAmount",
          formError: false,
          gridSizes: 6,
        },
        {
          title: "Go To Pass Points Used",
          type: "text",
          keyValue: "goToPassPointsUsed",
          value: 87,
          required: true,
          formError: false,
          gridSizes: 12,
        },
        {
          title: "Amount eligible for earning points",
          type: "notText",
          align: false,
          keyValue: "amountEligibleForEarningPoints",

          gridSizes: 12,
          formError: false,
        },
        {
          title: "Notes",
          type: "text",
          keyValue: "notes",

          required: true,
          gridSizes: 12,
          row: 4,
          formError: false,
        },
      ],
    };
   
    const earnPoints = {
      location:"Akasaka",
      date: currentDate,
      time: currentTime,
      transactionAmount: 0,
      taxAssumedAmount: 0,
      goToPassPointsUsed: 0,
      amountEligibleForEarningPoints: 0,
      notes: "",
    };
    const { getByTestId,findByTestId } = render(
      <FormLabel
        template={finalFields}
        onSubmit={() => {}}
        handleCancel={() => {}}
        defaultValues={earnPoints}
        handleUpdateFields={() => {}}
      />
    );

    //recepit Id label and Input box check

    //Transaction Amount label and Input box check
    const transactionAmountText = screen.getByRole("heading", {
      name: /transaction amount/i,
    });
    expect(transactionAmountText).toBeInTheDocument();
    const transactionAmoundId = getByTestId(
      "transactionAmount_id"
    ).querySelector("input");

    expect(transactionAmoundId).toHaveValue("0");
    expect(transactionAmoundId).not.toHaveFocus();
    fireEvent.click(transactionAmoundId);
    fireEvent.focus(transactionAmoundId);
    fireEvent.change(transactionAmoundId, { target: { value: 50000 } });
    expect(transactionAmoundId).toHaveValue("50000");

    //Tax Assumed Amount label and value  check
    const taxAssumedAmount = screen.getByRole("heading", {
      name: /tax assumed amount/i,
    });
    expect(taxAssumedAmount).toBeInTheDocument();
    const taxAssumentValue =  await findByTestId("taxAssumedAmountTyV");
    expect(taxAssumentValue.textContent).toBe("¥0");

    //go to pass points used label and Input box check
    const gotToPassPointsUsed = screen.getByRole("heading", {
      name: /go to pass points used/i,
    });
    expect(gotToPassPointsUsed).toBeInTheDocument();
    const goToPassPointsUsedId = getByTestId(
      "goToPassPointsUsed_id"
    ).querySelector("input");

    expect(goToPassPointsUsedId).toHaveValue("0");
    expect(goToPassPointsUsedId).not.toHaveFocus();
    fireEvent.click(goToPassPointsUsedId);
    fireEvent.focus(goToPassPointsUsedId);
    fireEvent.change(goToPassPointsUsedId, { target: { value: 100 } });
    expect(goToPassPointsUsedId).toHaveValue("100");

    //Amount Eligible label and value  check
    const AmountEligiblelabeltext = screen.getByRole("heading", {
      name: /amount eligible for earning points/i,
    });
    expect(AmountEligiblelabeltext).toBeInTheDocument();
    
    const amountEligible =  await findByTestId("amountEligibleForEarningPointsTyV");
    expect(amountEligible.textContent).toBe("¥0");


    //Notes label and Input box check
    const notesId = screen.getByRole("heading", {
      name: /notes/i,
    });
    expect(notesId).toBeInTheDocument();
    const notesValue = getByTestId("notes_id").querySelector("input");

    expect(notesValue).toHaveValue("");
    expect(notesValue).not.toHaveFocus();
    fireEvent.click(notesValue);
    fireEvent.focus(notesValue);
    fireEvent.change(notesValue, { target: { value: "New Bill added" } });
    expect(notesValue).toHaveValue("New Bill added");
  });
});
