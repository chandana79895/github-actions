import { Box, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next";

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
      <Typography color={palette.primary.main} variant="h2">{t('pageNotFound')}</Typography>
    </Box>
  )
}

export default NotFound