import { FC } from "react";
import Card from "./Card";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import dropdown_down from "../assets/icons/dropdown_down.svg";
import dropdown_up from "../assets/icons/dropdown_up.svg";
import user from "../assets/icons/user.svg";

type MemberCardProps = {
  name: string;
  expandable?: boolean;
  expanded?: boolean;
  expiringPoints?: string;
  expiryDate?: string;
  membershipID?: string;
  points?: string;
  setExpanded?: (expanded: boolean) => void;
  tier?: string;
}

const MemberCard: FC<MemberCardProps> = ({
  name,
  expandable,
  expanded = 'true',
  expiringPoints,
  expiryDate,
  membershipID,
  points,
  setExpanded,
  tier,
}) => {
  const { t } = useTranslation();
  const palette = useTheme().palette;
  return (
    <Card >
      <Grid container gap={1}>
        {/* If the card is expandable, it displays the dropdown icon on the right */}
        <Grid item xs={expandable ? 11 : 12} >
          <div className={`flex-align-center ${expanded && 'mb-15px'}`}>
            <img src={user} />
            <Typography variant="h2" className="pl-10"> {name}</Typography>
          </div>
        </Grid>

        {expandable && <Grid item>
          <img src={expanded ? dropdown_up : dropdown_down} onClick={() => setExpanded && setExpanded(!expanded)} />
        </Grid>}

        {/* Hidden unless the card is expanded, expended by default, can be overidden by passing props */}
        {expanded && <>
          <Grid item xs={12}>
            <Typography variant="h3">{points} {t('validPoints')} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{t('currentTier')}: {tier} | {t('membershipId')}: {membershipID} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color={palette.primary.main}>{expiringPoints} {t('pointsExpireon')} {expiryDate} </Typography>
          </Grid>
        </>
        }
      </Grid>
    </Card >
  )
}

export default MemberCard