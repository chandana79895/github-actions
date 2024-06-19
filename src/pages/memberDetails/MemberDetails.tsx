import Button from "@/components/Button";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import MemberCard from "@/components/MemberCard";
import { rsp } from "@/constants/tests/shortPath";
import { getWords } from "@/constants/tests/words";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import moment from "moment";

const MemberDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [memberData, setMemberData] = useState(null);

  const handleSubmit = () => {
    navigate("/earn-points");
  };
  const data = {
    firstName: memberData?.firstName ,
    lastName:  memberData?.lastName,
    points: memberData?.loyaltyPoints,
    tier: memberData?.currentSlab,
    membershipID: memberData?.cardId,
    expiringPoints: memberData?.expiryPoints,
    pointsExpiryDate: moment(memberData?.pointsExpiryDate).format("YYYY/MM/DD"),
  };

  useEffect(() => {
    const storedMemberData = JSON.parse(localStorage.getItem("memberData"));
    if (storedMemberData) {
      setMemberData(storedMemberData);
    }
  }, []);

  // used for generating testIDs
  const currentPage = rsp("member-details");

  return (
    <div
      className="cards-container"
      id={currentPage + "CONT"}
      data-testid={currentPage + "CONT"}
    >
      <MemberCard {...data} testID={currentPage} />
      <Card
        title={t("earnPoints")}
        testID={currentPage + getWords("earnPoints")}
      >
        <div className="height-50" />
        <Button
          title={t("enterRecepitDetails")}
          onClick={handleSubmit}
          testID={currentPage + getWords("enterRecepitDetails")}
        />
      </Card>
    </div>
  );
};

export default MemberDetails;
