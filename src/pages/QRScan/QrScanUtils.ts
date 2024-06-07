import { RefObject } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router";

export const handleScan = async (
  codeReader: RefObject<BrowserMultiFormatReader>,
  videoRef: RefObject<HTMLVideoElement>,
  setScannedData: (data: string) => void,
  setError: (error: boolean) => void
) => {
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

export const handleManualLookUp = (
  navigate: ReturnType<typeof useNavigate>
) => {
  navigate("/member-search");
};

export const startVideo = async (
  videoRef: RefObject<HTMLVideoElement>,
  setStream: (stream: MediaStream) => void,
  setError: (error: boolean) => void
) => {
  try {
    const constraints = {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = mediaStream;
    setStream(mediaStream);
    videoRef.current.play();
} catch (err) {
    console.error("Error accessing camera:", err);
    setError(true);
  }
};
export const stopVideo = (
    videoRef: RefObject<HTMLVideoElement>,
    setStream: (stream: MediaStream | null) => void,
    setError: (error: boolean) => void
  ) => {
    try {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setStream(null);
      }
      setError(false);
    } catch (err) {
      console.error("Error stopping video stream:", err);
      setError(true);
    }
  };

export const handleCloseModal = (
  setShowPopup: (show: boolean) => void,
  setError: (error: boolean) => void
) => {
  setShowPopup(false);
  setError(false);
  window.location.reload();
};

export const handleTryAgain = (
  setShowPopup: (show: boolean) => void,
  setError: (error: boolean) => void
) => {
  setShowPopup(false);
  setError(false);
  window.location.reload();
};
