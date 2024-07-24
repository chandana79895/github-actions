import { getApi } from "./api/http";
import { Endpoints } from "../constants/endpoints";

const logout = (contextValue) => {
  const { property, store } = contextValue;
  const loginName = localStorage.getItem("login_name");
  const payload = {
    username: loginName,
    location: property.value || "",
    location_jp: property.label_jp || "",
    store: store.value || "",
    store_jp: store.label_jp || "",
    loginName: loginName,
    storeID: store.storeID || "",
    storeThreshold: store.storeThreshold,
    storeEmail: store.storeEmail || "",
  };

  getApi(Endpoints.logout, payload, "POST");
};

export default logout;
