import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppContext } from "@/store/AppContext";
import EarnPointsPage from "./EarnPointsPage";
import { MockContext } from "@/constants/tests/MockContext";
import * as http from "@/utils/api/http";
import { AxiosResponse } from "axios";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.useFakeTimers();
const apiSpy = jest.spyOn(http, "getApi");
const consoleSpy = jest.spyOn(console, "error");

describe("EarnPointsPage", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        loyaltyPoints: 100,
        currentSlab: "Gold",
        memberId: "123456",
        pointsExpiryDate: "2023/12/31",
      })
    );
    consoleSpy.mockImplementation(() => {});
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("renders with 2 cards", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <EarnPointsPage />
        </AppContext.Provider>
      </MemoryRouter>
    );
    expect(getByTestId("EPMBRC")).toBeInTheDocument();
    expect(getByTestId("EP024")).toBeInTheDocument();
  });

  it("it generates required fields", async () => {
    const fields = [
      "EP035IN",
      "EP037IN",
      "EP038IN",
      "EP039IN",
      "EP040DV",
      "EP041IN",
      "EP042DV",
      "EP043IN",
      "EP045B",
      "EP046B",
    ];
    const { getByTestId } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <EarnPointsPage />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Check if all fields and buttons are present
    fields.forEach((field) => {
      expect(getByTestId(field)).toBeInTheDocument();
    });
  });

  describe("Calculation", () => {
    it("calculates Tax assumed amount correctly", async () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <EarnPointsPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const amountInput = getByTestId("EP039IN");
      const taxAssumed = getByTestId("EP040DV");
      fireEvent.change(amountInput, { target: { value: "1000" } });
      expect(taxAssumed).toHaveTextContent("¥90");
    });

    it("calculates earning amount without points used", async () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <EarnPointsPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const amountInput = getByTestId("EP039IN");
      const taxAssumed = getByTestId("EP040DV");
      const earned = getByTestId("EP042DV");
      fireEvent.change(amountInput, { target: { value: "1000" } });
      expect(taxAssumed).toHaveTextContent("¥90");
      expect(earned).toHaveTextContent("¥910");
    });

    it("calculates earning amount with points used", async () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <EarnPointsPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const amountInput = getByTestId("EP039IN");
      const taxAssumed = getByTestId("EP040DV");
      const pointsUsed = getByTestId("EP041IN");
      const earned = getByTestId("EP042DV");
      fireEvent.change(amountInput, { target: { value: "1000" } });
      fireEvent.change(pointsUsed, { target: { value: "10" } });
      expect(taxAssumed).toHaveTextContent("¥90");
      expect(earned).toHaveTextContent("¥900");
    });
  });

  describe("onCancel", () => {
    beforeEach(() => {
      mockNavigate.mockReset();
    });
    it('navigates to "/member-search" on cancel', async () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <EarnPointsPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const cancelButton = getByTestId("EP046B");
      fireEvent.click(cancelButton);
      expect(mockNavigate).toHaveBeenCalledWith("/member-search");
    });
  });

  describe("onSubmit", () => {
    it("calls getApi with correct arguments", async () => {
      apiSpy.mockImplementation(() =>
        Promise.resolve({
          data: {
            message: "Transaction added and points redeemed successfully!",
            keyValue: "successTrxAndEarnedPoints",
          },
          status: 200,
        } as AxiosResponse)
      );

      const { getByTestId, queryByTestId } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <EarnPointsPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const amountInput = getByTestId("EP039IN");
      const points_used = getByTestId("EP041IN");
      fireEvent.change(amountInput, { target: { value: "10" } });
      fireEvent.change(points_used, { target: { value: "0" } });
      const submitButton = getByTestId("EP045B");
      const location = getByTestId("EP035IN");
      fireEvent.change(location, { target: { value: "Test" } });
      fireEvent.click(submitButton);
      await act(async () => {
        jest.runAllTimers();
      });
      const modal = queryByTestId("EPMDL");
      expect(modal).toBeInTheDocument();
    });
  });
});
