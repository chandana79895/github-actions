import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps} from "@mui/material";
import { FC, ReactNode } from "react";

type ButtonProps = {
  loading?: boolean;
  loadingText?: string;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  testID?: string;
  variant?:MuiButtonProps['variant']
};

// Button component with loading state
const Button: FC<ButtonProps> = ({
  title,
  loading,
  onClick,
  disabled,
  loadingText,
  className,
  icon,
  variant,
  testID=''
}) => {
  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        ...(className && { className }),
      }}
      variant={variant}
      data-testid={`${testID}B`}
      id={`${testID}B`}
    >
      {loading ? (
        <>
          {loadingText}
          <CircularProgress className="font-white ml-1" size={20} />
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{title}</span>
          {icon && (
            <span
              style={{ verticalAlign: "middle", marginBottom: "-8px" }}
              className="ml-1"
            >
              {icon}
            </span>
          )}
        </div>
      )}
    </MuiButton>
  );
};

export default Button;
