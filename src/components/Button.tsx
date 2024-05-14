import { CircularProgress, Button as MuiButton } from "@mui/material"
import { FC } from "react";

type ButtonProps = {
  loading?: boolean;
  loadingText?: string;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  className?: string;
}

// Button component with loading state
const Button: FC<ButtonProps> = ({ title, loading, onClick, disabled, loadingText, className }) => {
  return (
    <MuiButton disabled={disabled} onClick={onClick} className={className}>
      {loading
        ? <>{loadingText}<CircularProgress className="font-white ml-1" size={20} /></>
        : title
      }
    </MuiButton>
  )
}

export default Button