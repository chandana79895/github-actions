import { FC } from "react";
import Card from "./Card";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import dropdown_down from "../assets/icons/dropdown_down.svg";
import dropdown_up from "../assets/icons/dropdown_up.svg";
import user from "../assets/icons/user.svg";

type MemberCardProps = {
  firstName: string;
  lastName: string;
  expandable?: boolean;
  expanded?: boolean;
  expiringPoints?: number;
  pointsExpiryDate?: string;
  membershipID?: string;
  points?: number;
  setExpanded?: (expanded: boolean) => void;
  tier?: string;
  testID?: string;
};

const MemberCard: FC<MemberCardProps> = ({
  firstName,
  lastName,
  expandable,
  expanded = "true",
  expiringPoints,
  pointsExpiryDate,
  membershipID,
  points,
  setExpanded,
  tier,
  testID,
}) => {
  const { t } = useTranslation();
  const palette = useTheme().palette;
  const cardTestID = testID + "MBRC";
  return (
    <Card testID={cardTestID}>
      <Grid container gap={1}>
        {/* If the card is expandable, it displays the dropdown icon on the right */}
        <Grid item xs={expandable ? 11 : 12}>
          <div className={`flex-align-center ${expanded && "mb-15px"}`}>
            <img
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

        {expandable && (
          <Grid item>
            <img
              src={expanded ? dropdown_up : dropdown_down}
              onClick={() => setExpanded && setExpanded(!expanded)}
            />
          </Grid>
        )}

        {/* Hidden unless the card is expanded, expended by default, can be overidden by passing props */}
        {expanded && (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                id={`${cardTestID}PT`}
                data-testid={`${cardTestID}PT`}
              >
                {points} {t("validPoints")}{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                id={`${cardTestID}MID`}
                data-testid={`${cardTestID}MID`}
              >
                {t("currentTier")}: {tier} | {t("membershipId")}: {membershipID}{" "}
              </Typography>
            </Grid>
            {expiringPoints && (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color={palette.primary.main}
                  id={`${cardTestID}PEX`}
                  data-testid={`${cardTestID}PEX`}
                >
                  {expiringPoints} {t("pointsExpireon")} {pointsExpiryDate}{" "}
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Card>
  );
};

export default MemberCard;
