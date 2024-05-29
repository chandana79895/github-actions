import { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import "./QrScan.css";
import Button from "../../components/Button";
import { BrowserMultiFormatReader } from "@zxing/browser";
import qrScannerGrid from "../../assets/icons/qrScannerGrid.png";
import { Modal } from "@/components/Modal";
import { t } from "i18next";
import { useNavigate } from "react-router";
 
const QrScan = () => {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [stream, setStream] = useState(null);
 
  const handleScan = async () => {
    try {
      const result = await codeReader.current.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current
      );
      setScannedData(result.getText());
      setError(false);
    } catch (err) {
      console.error("Error decoding QR code:", err);
      setError(true);
    }
  };
  const handleManualLookUp = ()=>{
    navigate("/member-search")
  }
  const startVideo = async () => {
    try {
      const constraints = {
        video: {
          // facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(true);
    }
  };
 
  const handleCloseModal = () => {
    setShowPopup(false);
    setError(false);
    window.location.reload();
  };
 
  const handleTryAgain = () => {
    setShowPopup(false);
    setError(false);
    window.location.reload();
  };
 
  useEffect(() => {
    if (scannedData) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/member-details");
      }, 3000);
    }
  }, [scannedData]);
 
  useEffect(() => {
    handleScan();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);
 
  useEffect(() => {
    startVideo();
  }, []);
 
  return (
    <Grid
      className="scanner-page"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <img src={qrScannerGrid} alt="QR Scanner Grid" className="qr-grid" />
      <video ref={videoRef} className="scan-box" />
      <Button
        className="scan-button"
        title="Manual Lookup"
        onClick={handleManualLookUp}
        loadingText="Scanning"
      />
      <Modal
        error={error}
        open={showPopup}
        buttonText={t("tryAgain")}
        successText={t("scanSuccess")}
        errorText={t("errorScanFailed")}
        onClose={handleCloseModal}
        onClick={handleTryAgain}
        successMessage={`${scannedData}`}
      />
    </Grid>
  );
};
 
export default QrScan;
 