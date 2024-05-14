import { type FC } from "react"
import { Typography, useTheme } from "@mui/material"

type ErrorMessageProps = {
  message: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const { palette } = useTheme();
  
  return (
    <Typography color={palette.error.main}>{message}</Typography>
  )
}

export default ErrorMessage