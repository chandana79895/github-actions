import "./styles/Modal.css";
import { CheckCircle } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Dialog, DialogContent, Typography } from "@mui/material";
import Button from "./Button";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  error?: boolean;
  onClick: () => void;
  buttonText?: string;
  errorText?: ReactNode;
  successText?: ReactNode;
  message?: ReactNode;
  testID?: string;
}

export const Modal = ({
  open,
  onClose,
  error,
  onClick,
  buttonText = "",
  errorText = "",
  successText = "",
  message = "",
  testID,
}: ModalProps) => {
  const IconComponent = error ? CancelOutlinedIcon : CheckCircle;
  const iconColor = error ? "error-icon" : "success-icon";
  const title = error ? errorText : successText;

  return (
    <Dialog open={open} onClose={onClose} className="box">
      <DialogContent
        className="modal-content"
        data-testid={testID && `${testID}`}
        id={testID && `${testID}`}
      >
        <div
          className="modal-icon"
          data-testid={testID && `${testID} ICN`}
          id={testID && `${testID}ICN`}
        >
          <IconComponent className={iconColor} />
        </div>

        {title && (
          <div className={"modal-title"}>
            <Typography
              data-testid={testID && `${testID}LB`}
              id={testID && `${testID}LB`}
            >
              {title}
            </Typography>
          </div>
        )}

        {message && (
          <div className={"modal-title"}>
            <Typography
              data-testid={testID && `${testID}MSG`}
              id={testID && `${testID}MSG`}
            >
              {message}
            </Typography>
          </div>
        )}

        {buttonText && (
          <Button title={buttonText} onClick={onClick} testID={testID} />
        )}
      </DialogContent>
    </Dialog>
  );
};
