import { fireEvent, render } from "@testing-library/react";
import MemberCard from "./MemberCard";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("MemberCard component", () => {
  it("renders with required prop", () => {
    const { getByText, queryAllByRole } = render(
      <MemberCard firstName="Test" lastName="name" />
    );
    expect(getByText("Test name")).toBeInTheDocument();
    const images = queryAllByRole("img", {name: "avatar"});
    expect(images).toHaveLength(1);
  });

  it("renders with all optional props", () => {
    const { getByText } = render(
      <MemberCard
        firstName="Test"
        lastName="name"
        points={100}
        tier="Gold"
        membershipID="12345"
        expiringPoints={50}
        pointsExpiryDate="2024-12-31"
        cardNumbers={["1234", "5678"]}
      />
    );
    expect(getByText("100 validPoints")).toBeInTheDocument();
    expect(getByText("currentTier:")).toBeInTheDocument();
    expect(getByText("Gold")).toBeInTheDocument();
    expect(getByText("membershipId:")).toBeInTheDocument();
    expect(getByText("12345")).toBeInTheDocument();
    expect(getByText("50 pointsExpireOn 2024-12-31")).toBeInTheDocument();
    expect(getByText("cardNumbers:")).toBeInTheDocument();
    expect(getByText("1234,")).toBeInTheDocument();
    expect(getByText("5678")).toBeInTheDocument();
  });
 
  it("calls setExpanded with correct argument on card click", () => {
    const setExpandedMock = jest.fn();
    const { getByTestId } = render(
      <MemberCard
        firstName="Test"
        lastName="name"
        expanded={false}
        setExpanded={setExpandedMock}
        testID="test"
      />
    );
    const card = getByTestId("testMBRC");
    fireEvent.click(card);
    expect(setExpandedMock).toHaveBeenCalledWith(true);
  });
});
