import { RefObject } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router";
import { getApi, headers } from "@/api/utils/http";
import { Endpoints } from "@/api/const/endpoints";
import { scan_limit } from "@/api/const/env";

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
    let scannedString = result.getText();
    setScannedData(scannedString);

    setError(false);
  } catch (err) {
    console.error("Error decoding QR code:", err);
    setError(true);
  }
};

export const searchMember = async (
  scannedData: string,
  setLoading: (loading: boolean) => void,
  setMemberData: (data: any) => void,
  setError: (error: boolean) => void,
  setShowPopup: (show: boolean) => void,
  setShowManualLookupModal: (show: boolean) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  const payload = {
    id: scannedData,
    showPoints: true,
  };
  let failureCount = parseInt(localStorage.getItem("failureCount") || "0");
  setLoading(true);
  try {
    const response = await getApi(
      Endpoints.getCustomer,
      payload,
      "GET_PARAMS",
      headers
    );

    const memberData = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      loyaltyPoints: response.data.loyaltyPoints,
      currentSlab: response.data.currentSlab,
      expiryPoints: response.data.expirySchedules.points,
      pointsExpiryDate: response.data.expirySchedules.expiryDate,
      cardId: response.data.cardId,
      card_number: response.data.cardNumber,
    };
    localStorage.setItem("memberData", JSON.stringify(memberData));
    setMemberData(memberData);
    setError(false);
    failureCount = 0;
    localStorage.setItem("failureCount", failureCount.toString());
    if (memberData) navigate("/member-details");
  } catch (error) {
    console.error("Error fetching Member:", error);
    setMemberData(null);
    setShowPopup(true);
    setError(true);
    failureCount += 1;
    localStorage.setItem("failureCount", failureCount.toString());
    if (failureCount > scan_limit) {
      setShowManualLookupModal(true);
      failureCount = 0;
      localStorage.setItem("failureCount", failureCount.toString());
    }
  } finally {
    setLoading(false);
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
      tracks.forEach((track) => track.stop());
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
