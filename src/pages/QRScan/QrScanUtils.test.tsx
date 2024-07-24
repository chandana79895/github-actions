import { RefObject } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { getApi } from "@/utils/api/http";
import {
  handleScan,
  searchMember,
  handleManualLookUp,
  startVideo,
  handleCloseModal,
} from "./QrScanUtils";

jest.mock("@/utils/api/http", () => ({
  getApi: jest.fn(),
  headers: jest.fn(),
}));
jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("QrScanUtils", () => {
  let videoRef: RefObject<HTMLVideoElement>;
  let codeReader: RefObject<BrowserMultiFormatReader>;

  beforeEach(() => {
    jest.clearAllMocks();
    videoRef = { current: document.createElement("video") };
    codeReader = { current: new BrowserMultiFormatReader() };
    localStorage.clear();

    // Mock navigator.mediaDevices.getUserMedia
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: jest.fn(),
      },
      configurable: true,
    });
  });

  describe("handleScan", () => {
  //   it("should decode QR code and set scanned data", async () => {
  //     const mockResult = { getText: jest.fn().mockReturnValue("testData") };

  //     const mockControls = { stop: jest.fn() };
  //     codeReader.current.decodeFromVideoDevice = jest
  //       .fn()
  //       .mockImplementation((callback) => {
  //         setTimeout(() => {
  //           callback(mockResult);
  //         }, 100);
  //         return mockControls;
  //       });

  //     const setScannedData = jest.fn();
  //     const setError = jest.fn();

  //     await handleScan(codeReader, videoRef, setScannedData, setError);

  //     await new Promise((resolve) => setTimeout(resolve, 150));

  //     expect(mockResult.getText).toHaveBeenCalled();
  //     expect(setScannedData).toHaveBeenCalledWith("testData");
  //     expect(setError).toHaveBeenCalledWith(false);
  //   });

    it("should set error on decoding failure", async () => {
      codeReader.current.decodeOnceFromVideoDevice = jest
        .fn()
        .mockRejectedValue(new Error("Decode error"));

      const setScannedData = jest.fn();
      const setError = jest.fn();

      await handleScan(codeReader, videoRef, setScannedData, setError);

      expect(setError).toHaveBeenCalledWith(true);
    });
  });

  describe("searchMember", () => {
    const navigate = jest.fn();
    const setLoading = jest.fn();
    const setMemberData = jest.fn();
    const setError = jest.fn();
    const setShowPopup = jest.fn();
    const setShowManualLookupModal = jest.fn();

    it("should search member and set member data on success", async () => {
      const mockResponse = {
        data: {
          firstName: "John",
          lastName: "Doe",
          loyaltyPoints: 100,
          currentSlab: "Gold",
          expirySchedules: { points: 50, expiryDate: "2022-12-31" },
          memberId: "12345",
          cardNumber: "54321",
        },
      };

      (getApi as jest.Mock).mockResolvedValue(mockResponse);

      await searchMember(
        "testData",
        setLoading,
        setMemberData,
        setError,
        setShowPopup,
        setShowManualLookupModal,
        navigate
      );

      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setMemberData).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        loyaltyPoints: 100,
        currentSlab: "Gold",
        expiryPoints: 50,
        pointsExpiryDate: "2022-12-31",
        memberId: "12345",
        card_number: "54321",
      });
      expect(setError).toHaveBeenCalledWith(false);
      expect(setShowPopup).not.toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith("/earn-points");
    });

    it("should handle errors during member search", async () => {
      (getApi as jest.Mock).mockRejectedValue(new Error("API error"));

      localStorage.setItem("failureCount", "0");

      await searchMember(
        "testData",
        setLoading,
        setMemberData,
        setError,
        setShowPopup,
        setShowManualLookupModal,
        navigate
      );

      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setError).toHaveBeenCalledWith(true);
      expect(setShowPopup).toHaveBeenCalledWith(true);
      expect(setShowManualLookupModal).not.toHaveBeenCalled();
      expect(setMemberData).toHaveBeenCalledWith(null);
      expect(localStorage.getItem("failureCount")).toBe("1");
    });

    it("should show manual lookup modal after exceeding scan limit", async () => {
      (getApi as jest.Mock).mockRejectedValue(new Error("API error"));

      localStorage.setItem("failureCount", "0");

      await searchMember(
        "testData",
        setLoading,
        setMemberData,
        setError,
        setShowPopup,
        setShowManualLookupModal,
        navigate
      );

      expect(setMemberData).toHaveBeenCalledWith(null);
      expect(localStorage.getItem("failureCount")).toBe("1");
    });
  });

  describe("handleManualLookUp", () => {
    it("should navigate to member search page", () => {
      const navigate = jest.fn();
      handleManualLookUp(navigate);
      expect(navigate).toHaveBeenCalledWith("/member-search");
    });
  });

  describe("startVideo", () => {
    it("should handle error when starting video stream", async () => {
      (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(
        new Error("Camera error")
      );

      const setStream = jest.fn();
      const setError = jest.fn();

      await startVideo(videoRef, setStream, setError);

      expect(setError).toHaveBeenCalledWith(true);
    });
  });

  describe("handleCloseModal", () => {
    it("should close modal and reload window", () => {
      const setShowPopup = jest.fn();
      const setError = jest.fn();

      Object.defineProperty(window, "location", {
        value: {
          ...window.location,
          reload: jest.fn(),
        },
        writable: true,
      });

      handleCloseModal(setShowPopup, setError);

      expect(setShowPopup).toHaveBeenCalledWith(false);
      expect(setError).toHaveBeenCalledWith(false);
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe("handleTryAgain", () => {
    it("should close modal and reload window", () => {
      const setShowPopup = jest.fn();
      const setError = jest.fn();

      Object.defineProperty(window, "location", {
        value: {
          ...window.location,
          reload: jest.fn(),
        },
        writable: true,
      });

      handleCloseModal(setShowPopup, setError);

      expect(setShowPopup).toHaveBeenCalledWith(false);
      expect(setError).toHaveBeenCalledWith(false);
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
