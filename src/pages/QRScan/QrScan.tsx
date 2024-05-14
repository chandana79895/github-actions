import { useState, useRef, SetStateAction, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { Grid } from "@mui/material";
import "./QrScan.css";
import Button from "../../components/Button";
import { BrowserBarcodeReader } from "@zxing/library";
import qrScannerGrid from "../../assets/icons/qrScannerGrid.png";

const QrScan = () => {
  const [scannedData, setScannedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const webcamRef = useRef(null);

  const handleError = (error: any) => {
    console.error("Error:", error);
  };

  const handleScan = (result: { text: SetStateAction<string> }) => {
    if (result) {
      setScannedData(result.text);
    }
    return;
  };

  const capture = async () => {
    // if (webcamRef.current && webcamRef.current.getScreenshot) {
    const imageSrc = webcamRef.current.getScreenshot();
    const codeReader = new BrowserBarcodeReader();
    try {
      const result = await codeReader.decodeFromImage(undefined, imageSrc);
      setScannedData(result.getText());
    } catch (err) {
      console.error("Error decoding QR code:", err);
      // }
    }
  };

  useEffect(() => {
    if (scannedData) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [scannedData]);
  return (
    <Grid
      className="scanner-page"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <img src={qrScannerGrid} alt="QR Scanner Grid" className="qr-grid" />
      <QrReader
        className="scan-box"
        onError={handleError}
        onScan={handleScan}
        constraints={{ facingMode: "environment" }}
      />
      <Button
        className="scan-button"
        title="Manual Lookup"
        onClick={capture}
        loadingText="Scanning"
      />
      {showPopup && <div className="popup">Scan complete</div>}
    </Grid>
  );
};

export default QrScan;
