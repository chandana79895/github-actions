import { renderHook } from "@testing-library/react";
import {
  useOrganizationRedirect,
  useLanguageChange,
  useLocalStorageLanguage,
  useLocalStorageProperty,
  useLocalStorageStore,
  useLocalStorageEmployeeId,
} from "@/utils/useLocalStorage";
import i18next, { i18n as I18n } from "i18next";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("i18next", () => ({
  changeLanguage: jest.fn(),
  t: jest.fn(),
  init: jest.fn(),
  loadResources: jest.fn(),
  use: jest.fn(),
  addResourceBundle: jest.fn(),
  addResource: jest.fn(),
  addResources: jest.fn(),
  hasResourceBundle: jest.fn(),
  getResourceBundle: jest.fn(),
  removeResourceBundle: jest.fn(),
  getDataByLanguage: jest.fn(),
}));

describe("Hooks Tests", () => {
  describe("useOrganizationRedirect", () => {
    it("should navigate to /login when organizationID is empty or undefined", () => {
      const navigate = jest.fn();

      const { rerender } = renderHook(
        ({ orgID }) => useOrganizationRedirect(orgID, navigate),
        {
          initialProps: { orgID: "" },
        }
      );

      expect(navigate).toHaveBeenCalledWith("/login", { replace: true });

      rerender({ orgID: undefined });

      expect(navigate).toHaveBeenCalledWith("/login", { replace: true });
    });

    it("should not navigate when organizationID is valid", () => {
      const navigate = jest.fn();

      renderHook(() => useOrganizationRedirect("validOrgID", navigate));

      expect(navigate).not.toHaveBeenCalled();
    });
  });

  describe("useLanguageChange", () => {
    it("should change language to 日本語 (jp)", () => {
      const i18nMock = i18next as jest.Mocked<I18n>;

      renderHook(() => useLanguageChange("日本語", i18nMock));

      expect(i18nMock.changeLanguage).toHaveBeenCalledWith("jp");
    });

    it("should change language to English (en)", () => {
      const i18nMock = i18next as jest.Mocked<I18n>;

      renderHook(() => useLanguageChange("English", i18nMock));

      expect(i18nMock.changeLanguage).toHaveBeenCalledWith("en");
    });
  });

  describe("useLocalStorageLanguage", () => {
    it("should set language in localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

      renderHook(() => useLocalStorageLanguage("English"));

      expect(setItemSpy).toHaveBeenCalledWith("language", "English");

      setItemSpy.mockRestore();
    });
  });

  describe("useLocalStorageProperty", () => {
    it("should set property in localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
      const property = {
        label: "Test Property",
        label_jp: "TestProperty",
        value: "testValue",
      };

      renderHook(() => useLocalStorageProperty(property));

      expect(setItemSpy).toHaveBeenCalledWith(
        "property",
        JSON.stringify(property)
      );

      setItemSpy.mockRestore();
    });
  });

  describe("useLocalStorageStore", () => {
    it("should set store in localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
      const store = {
        label: "Test Store",
        label_jp: "Test Store",
        value: "testValue",
        storeID: "1234",
        storeThreshold: "100",
        storeEmail: "",
      };

      renderHook(() => useLocalStorageStore(store));

      expect(setItemSpy).toHaveBeenCalledWith("store", JSON.stringify(store));

      setItemSpy.mockRestore();
    });
  });

  describe("useLocalStorageEmployeeId", () => {
    it("should set employeeID in localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

      renderHook(() => useLocalStorageEmployeeId("testEmployeeID"));

      expect(setItemSpy).toHaveBeenCalledWith("employeeID", "testEmployeeID");

      setItemSpy.mockRestore();
    });
  });
});
