import "./styles/Modal.css";
import { CheckCircle } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Dialog, DialogContent, Typography } from "@mui/material";
import Button from "./Button";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  error: boolean;
  onClick: () => void;
  buttonText?: string;
  errorText?: ReactNode;
  successText?: ReactNode;
  successMessage?: ReactNode;
}

export const Modal = ({
  open,
  onClose,
  error,
  onClick,
  buttonText = "",
  errorText = "",
  successText = "",
  successMessage = "",
}: ModalProps) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} className="box">
        <DialogContent className="modal-content">
          {error ? (
            <div className="modal-icon">
              <CancelOutlinedIcon className="error-icon" />
            </div>
          ) : (
            <div>
              <CheckCircle className="success-icon" />
            </div>
          )}
          {error ? (
            <div className={"modal-title"}>
              <Typography>{errorText}</Typography>
            </div>
          ) : (
            <div>
              <Typography>{successText}</Typography>
            </div>
          )}
          <br />
          {successMessage && (
            <div className={error && "modal-title"}>
              <Typography>{successMessage}</Typography>
            </div>
          )}
          <Button title={buttonText} onClick={onClick} loadingText="Scanning" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
