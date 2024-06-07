import Button from "@/components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import MemberCard from "@/components/MemberCard";
import { rsp } from "@/constants/tests/shortPath";
import { getWords } from "@/constants/tests/words";
import { useNavigate } from "react-router";

const MemberDetails = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/earn-points")
   }
  const { t } = useTranslation();
  const dummyData = { //dummy data, to be replaced with api call
    name: "Hikari Tanaka",
    points: '16,000',
    tier: "Silver",
    membershipID: "123456789",
    expiringPoints: '5,000',
    expiryDate: "2024/01/01",
  }

  // used for generating testIDs
  const currentPage = rsp('member-details');

  return (
    <div
      className="cards-container"
      id={currentPage + "CONT"}
      data-testid={currentPage + "CONT"}
    >
      <MemberCard {...dummyData} testID={currentPage} />

      <Card title={t("earnPoints")} testID={currentPage + getWords("earnPoints")} >
        <div className="height-50" />
        <Button
          title={t("enterInformationDirectly")}
          onClick={handleSubmit}
          testID={currentPage + getWords('enterInformationDirectly')}
        />
      </Card>
    </div>
  )
}

export default MemberDetails