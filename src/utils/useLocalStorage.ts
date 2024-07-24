import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { i18n as I18n } from "i18next";
import { PropertyType, StoreType } from "@/types/Types";

export function useOrganizationRedirect(
  organizationID: string | null | undefined,
  navigate: NavigateFunction
): void {
  useEffect(() => {
    if (organizationID === "" || organizationID === undefined) {
      navigate("/login", { replace: true });
    }
  }, [organizationID, navigate]);
}

export function useLanguageChange(language: string, i18n: I18n): void {
  useEffect(() => {
    const localeCode = language === "日本語" ? "jp" : "en";
    i18n.changeLanguage(localeCode);
  }, [language, i18n]);
}

export function useLocalStorageLanguage(language: string): void {
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
}

export function useLocalStorageProperty(property: PropertyType): void {
  useEffect(() => {
    localStorage.setItem("property", JSON.stringify(property));
  }, [property]);
}

export function useLocalStorageStore(store: StoreType): void {
  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);
}

export function useLocalStorageEmployeeId(employeeID: string): void {
  useEffect(() => {
    localStorage.setItem("employeeID", employeeID);
  }, [employeeID]);
}
