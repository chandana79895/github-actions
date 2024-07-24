import { RefObject } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router";
import { getApi, headers } from "@/utils/api/http";
import { Endpoints } from "@/constants/endpoints";
import { scan_limit } from "@/constants/env";
import { MemberType } from "@/types/Types";

export const handleScan = async (
  codeReader: RefObject<BrowserMultiFormatReader>,
  videoRef: RefObject<HTMLVideoElement>,
  setScannedData: (data: string) => void,
  setError: (error: boolean) => void,
) => {
  try {
    const controls = await codeReader.current.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result) => {
        if (result) {
          setScannedData(result?.getText());
          setError(false);
        }
      }
    );
 
    // stops scanning after 10 seconds
    setTimeout(() => controls.stop(), 10000);
  } catch (err) {
    console.error("Error decoding QR code:", err);
    setError(true);
  }
};

export const searchMember = async (
  scannedData: string,
  setLoading: (loading: boolean) => void,
  setMemberData: (data: MemberType) => void,
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
      memberId: response.data.memberId,
      card_number: response.data.cardNumber,
    };
    localStorage.setItem("memberData", JSON.stringify(memberData));
    setMemberData(memberData);
    setError(false);
    failureCount = 0;
    localStorage.setItem("failureCount", failureCount.toString());
    if (memberData) navigate("/earn-points");
  } catch (error) {
    console.error("Error fetching Member:", error);
    setMemberData(null);
    setShowPopup(true);
    setError(true);
    failureCount += 1;
    localStorage.setItem("failureCount", failureCount.toString());
    if (failureCount > Number(scan_limit)) {
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

export const handleCloseModal = (
  setShowPopup: (show: boolean) => void,
  setError: (error: boolean) => void
) => {
  setShowPopup(false);
  setError(false);
  window.location.reload();
};
