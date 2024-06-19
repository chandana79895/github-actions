import { render } from "@testing-library/react";
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
    const images = queryAllByRole("img");
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
      />
    );
    expect(getByText("100 validPoints")).toBeInTheDocument();
    expect(
      getByText("currentTier: Gold | membershipId: 12345")
    ).toBeInTheDocument();
    expect(getByText("50 pointsExpireon 2024-12-31")).toBeInTheDocument();
  });

  it("handles expandable prop correctly", () => {
    const { getAllByRole } = render(
      <MemberCard firstName="Test" lastName="name" expandable />
    );
    expect(getAllByRole("img")[1]).toBeInTheDocument();
  });
});
