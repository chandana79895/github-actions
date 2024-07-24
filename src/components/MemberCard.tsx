import { FC, ReactNode } from "react";
import Card from "./Card";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import dropdown_down from "../assets/icons/dropdown_down.svg";
import dropdown_up from "../assets/icons/dropdown_up.svg";
import user from "../assets/icons/user.svg";

type CardNumber = string | number;

type MemberCardProps = {
  firstName: string;
  lastName: string;
  expanded?: boolean;
  expiringPoints?: number;
  pointsExpiryDate?: string;
  membershipID?: string;
  points?: number;
  setExpanded?: (expanded: boolean) => void;
  tier?: string;
  testID?: string;
  cardNumbers?: CardNumber | CardNumber[];
};

const MemberCard: FC<MemberCardProps> = ({
  firstName,
  lastName,
  expanded = "true",
  expiringPoints,
  pointsExpiryDate,
  membershipID,
  points,
  setExpanded,
  tier,
  testID,
  cardNumbers,
}) => {
  const { t } = useTranslation();
  const palette = useTheme().palette;
  const cardTestID = testID + "MBRC";
  const isArray = Array.isArray(cardNumbers);
  return (
    <Card
      testID={cardTestID}
      onClick={() => setExpanded && setExpanded(!expanded)}
    >
      <Grid container gap={[0, 1]}>
        <Grid item xs={11}>
          <div className={`flex-align-center mb-15px`}>
            <img
              alt="avatar"
              src={user}
              id={`${cardTestID}IM`}
              data-testid={`${cardTestID}IM`}
            />
            <Typography
              variant="h2"
              className="pl-10"
              id={`${cardTestID}NM`}
              data-testid={`${cardTestID}NM`}
            >
              {firstName} {lastName}
            </Typography>
          </div>
        </Grid>

        <Grid item>
          <img src={expanded ? dropdown_up : dropdown_down} alt="caret" />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h3"
            id={`${cardTestID}PT`}
            data-testid={`${cardTestID}PT`}
          >
            {points} {t("validPoints")}{" "}
          </Typography>
        </Grid>
        {expiringPoints > 0 && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color={palette.primary.main}
              id={`${cardTestID}PEX`}
              data-testid={`${cardTestID}PEX`}
              fontWeight={"bold"}
            >
              {expiringPoints} {t("pointsExpireOn")} {pointsExpiryDate}{" "}
            </Typography>
          </Grid>
        )}

        {/* Hidden unless the card is expanded, expended by default, can be overidden by passing props */}
        {expanded && (
          <>
            <KeyValueText
              label={t("currentTier")}
              value={t(tier)}
              testID={`${cardTestID}CT`}
            />

            <KeyValueText
              label={t("membershipId")}
              value={membershipID}
              testID={`${cardTestID}MID`}
            />

            {((isArray && cardNumbers.length > 0) ||
              (!isArray && cardNumbers)) && (
              <KeyValueText
                label={t("cardNumbers")}
                value={
                  !isArray ? (
                    <>{cardNumbers}</>
                  ) : (
                    cardNumbers.map((cardNumber, idx) => (
                      <span key={`${idx}${cardNumber}`}>
                        {cardNumber}
                        {idx < cardNumbers.length - 1 && ", "}
                      </span>
                    ))
                  )
                }
                testID={`${cardTestID}CNS`}
              />
            )}
          </>
        )}
      </Grid>
    </Card>
  );
};

export default MemberCard;

type KeyValueTextProps = {
  label: string;
  value: ReactNode;
  testID?: string;
};

const KeyValueText: FC<KeyValueTextProps> = ({ label, value, testID }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" id={testID} data-testid={testID}>
        <span>{label}: </span>
        <span style={{ fontWeight: 700 }}>{value}</span>
      </Typography>
    </Grid>
  );
};
