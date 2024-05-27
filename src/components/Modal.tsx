import "./styles/Modal.css";
import { CheckCircle } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Dialog, DialogContent, Typography } from "@mui/material";
import Button from "./Button";

export const Modal = ({
  open,
  onClose,
  error,
  onClick,
  buttonText,
  errorText,
  successText,
  successMessage,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} className="box">
        <DialogContent className="modal-content">
          <div className="modal-icon">
            {error ? (
              <CancelOutlinedIcon className="error-icon" />
            ) : (
              <CheckCircle className="success-icon" />
            )}
          </div>
          <div className="modal-title">
            <Typography>{error ? errorText : successText}</Typography>
          </div>
          <div className="modal-title">
            <Typography>{successMessage ? successMessage : ""}</Typography>
          </div>
          {error && (
            <Button
              title={buttonText}
              onClick={onClick}
              loadingText="Scanning"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
