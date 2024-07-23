import { useState, useRef, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import "./QrScan.css";
import Button from "../../components/Button";
import { BrowserMultiFormatReader } from "@zxing/browser";
import qrScannerGrid from "../../assets/icons/qrScannerGrid.png";
import { Modal } from "@/components/Modal";
import { t } from "i18next";
import { useNavigate } from "react-router";
import {
  handleScan,
  handleManualLookUp,
  startVideo,
  handleCloseModal,
  handleTryAgain,
  stopVideo,
  searchMember,
} from "./QrScanUtils";
import { rsp } from "@/constants/tests/shortPath";
import Loader from "@/components/Loader";
import { AppContext } from "@/store/AppContext";

const QrScan = () => {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showManualLookupModal, setShowManualLookupModal] = useState(false);

  const { setMemberData } = useContext(AppContext);

  useEffect(() => {
    if (scannedData) {
      searchMember(
        scannedData,
        setLoading,
        setMemberData,
        setError,
        setShowPopup,
        setShowManualLookupModal,
        navigate
      );
    }
  }, [scannedData]);

  useEffect(() => {
    handleScan(codeReader, videoRef, setScannedData, setError);
    return () => {
      stopVideo(videoRef, setStream, setError);
    };
  }, [stream]);

  useEffect(() => {
    startVideo(videoRef, setStream, setError);
  }, []);

  //for generating test IDs
  const currentPage = rsp("qr-scan");

  return (
    <Grid
      className="scanner-page"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      data-testid={`${currentPage}CONT`}
      id={`${currentPage}CONT`}
    >
      <img
        src={qrScannerGrid}
        alt="QR Scanner Grid"
        className="qr-grid"
        data-testid={`${currentPage}GRID`}
        id={`${currentPage}GRID`}
      />
      <video
        ref={videoRef}
        className="scan-box"
        data-testid={`${currentPage}VID`}
        id={`${currentPage}VID`}
      />
      <Button
        className="scan-button"
        title={t("manualLookup")}
        onClick={() => handleManualLookUp(navigate)}
        loadingText="Scanning"
        testID={`${currentPage}MANU`}
      />
      {error && (
        <Modal
          error={error}
          open={showPopup}
          buttonText={t("tryAgain")}
          errorText={t("scanFailed")}
          onClose={() => handleCloseModal(setShowPopup, setError)}
          onClick={() => handleTryAgain(setShowPopup, setError)}
        />
      )}
      {showManualLookupModal && (
        <Modal
          error={true}
          open={showManualLookupModal}
          buttonText={t("manualLookup")}
          errorText={t("scanQRFailed")}
          onClose={() => handleManualLookUp(navigate)}
          onClick={() => handleManualLookUp(navigate)}
        />
      )}
      {loading && <Loader />}
    </Grid>
  );
};

export default QrScan;
