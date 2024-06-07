import { Box, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next";
import { getWords } from "@/constants/tests/words";

const NotFound = () => {
  const palette = useTheme().palette;
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Typography
        color={palette.primary.main}
        variant="h2"
        id={'ERR' + getWords("pageNotFound")}
        data-testid={'ERR' + getWords("pageNotFound")}
      >
        {t('pageNotFound')}
      </Typography>
    </Box >
  )
}

export default NotFound