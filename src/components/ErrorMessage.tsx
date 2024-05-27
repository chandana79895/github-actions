import { type FC } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import warn from '../assets/icons/warn.svg';

type ErrorMessageProps = {
  message: string
  className?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
  const { palette } = useTheme();

  return (
    <Box display={'flex'} flexDirection={"row"} className={className} >
      <img src={warn} />
      <Typography variant="subtitle1" fontWeight={500} color={palette.error.main}>{message}</Typography>
    </Box >
  )
}

export default ErrorMessage