import Button from "@/components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import MemberCard from "@/components/MemberCard";

const MemberDetails = () => {
  const handleSubmit = () => { }
  const { t } = useTranslation();
  const dummyData = { //dummy data, to be replaced with api call
    name: "Hikari Tanaka",
    points: '16,000',
    tier: "Silver",
    membershipID: "123456789",
    expiringPoints: '5,000',
    expiryDate: "2024/01/01",
  }

  return (
    <div className="cards-container">
      <MemberCard {...dummyData} />

      <Card title={t("earnPoints")}  >
        <div className="height-50" />
        <Button title={t("enterInformationDirectly")} onClick={handleSubmit} />
      </Card>
    </div>
  )
}

export default MemberDetails