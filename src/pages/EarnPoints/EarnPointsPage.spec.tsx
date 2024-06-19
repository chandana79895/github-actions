import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import EarnPointsPage from "./EarnPointsPage";
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Form Component Renderer", () => {
  test("finds the button and checks its text content", async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <EarnPointsPage />
      </MemoryRouter>
    );
    const submitButton = await findByTestId("btn-form-submitB");
    expect(submitButton.textContent).toBe("submit");

    const cancelButton = await findByTestId("btn-form-cancelB");
    expect(cancelButton.textContent).toBe("cancel");
  });

  test("Renders Changing transaction amount in the form", async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <EarnPointsPage />
      </MemoryRouter>
    );
    //Transaction Amount label and Input box check
    const submitButton = await findByTestId("transactionAmount_idLB");
    expect(submitButton.textContent).toBe("transactionAmount*");

    const taxAmountInitText = await findByTestId("taxAssumedAmountTyV");
    expect(taxAmountInitText.textContent).toBe("¥0");

    const amountEligible = await findByTestId(
      "amountEligibleForEarningPointsTyV"
    );
    expect(amountEligible.textContent).toBe("¥0");

    const transactionAmoundId = await findByTestId("transactionAmount_idIN");
    expect(transactionAmoundId).toHaveValue("0");
    expect(transactionAmoundId).not.toHaveFocus();
    fireEvent.click(transactionAmoundId);
    fireEvent.focus(transactionAmoundId);
    fireEvent.change(transactionAmoundId, { target: { value: 50000 } });
    expect(transactionAmoundId).toHaveValue("50000");
    expect(taxAmountInitText.textContent).toBe("¥4545");
    expect(amountEligible.textContent).toBe("¥45454");
  });

  test("Renders Changing gotoPassPoints amount in the form ", async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <EarnPointsPage />
      </MemoryRouter>
    );
    //Transaction Amount label and Input box check
    const gotoPassHeaderText = await findByTestId("goToPassPointsUsed_idLB");
    expect(gotoPassHeaderText.textContent).toBe("goToPassPointsUsed");

    const amountEligible = await findByTestId(
      "amountEligibleForEarningPointsTyV"
    );
    expect(amountEligible.textContent).toBe("¥0");

    const goToPassId = await findByTestId("goToPassPointsUsed_idIN");
    expect(goToPassId).toHaveValue("0");
    expect(goToPassId).not.toHaveFocus();
    fireEvent.click(goToPassId);
    fireEvent.focus(goToPassId);
    fireEvent.change(goToPassId, { target: { value: 200 } });
    expect(goToPassId).toHaveValue("200");
    expect(amountEligible.textContent).toBe("¥-200");
  });

  test("Renders Changing Notes in the form ", async () => {
    const { findByTestId } = render(<MemoryRouter>
      <EarnPointsPage />
  </MemoryRouter>);
    //Transaction Amount label and Input box check
    const notesHeaderText = await findByTestId("notes_idLB");
    expect(notesHeaderText.textContent).toBe("notes");

    const goToPassId = await findByTestId("notes_idIN");
    expect(goToPassId).toHaveValue("");
    expect(goToPassId).not.toHaveFocus();
    fireEvent.click(goToPassId);
    fireEvent.focus(goToPassId);
    fireEvent.change(goToPassId, { target: { value: "Added points command" } });
    expect(goToPassId).toHaveValue("Added points command");
  });
});
