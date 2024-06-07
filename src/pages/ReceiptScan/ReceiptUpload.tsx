import React, { useState } from "react";
import Webcam from "react-webcam";
import { Grid } from "@mui/material";
import "./ReceiptUpload.css";
import Button from "@/components/Button";
import qrScannerGrid from "../../assets/icons/qrScannerGrid.png";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";

const ReceiptUpload: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);
  if (imageSrc) {
    console.log("Image Source", imageSrc);
  }

  // const uploadImage = async () => {
  //   if (!imageSrc) {
  //     console.error("No image captured!");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("", {
  //       image: imageSrc,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <Grid
      className="scanner-page"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <img src={qrScannerGrid} alt="QR Scanner Grid" className="img-grid" />
      <Webcam
        className="scan-box"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button
        className="scan-button"
        title="Capture"
        onClick={capture}
        loadingText="Uploading"
        icon={<CenterFocusStrongOutlinedIcon />}
      ></Button>
    </Grid>
  );
};

export default ReceiptUpload;
