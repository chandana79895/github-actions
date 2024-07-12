import { getApi } from "./http";
import { Endpoints } from "../const/endpoints";

const logout = (contextValue) => {
  const { organizationID, property, store } = contextValue;
  const loginName = localStorage.getItem("login_name");
  const payload = {
    //NOTE: used organizationID as username for logout, might need to replace it later
    username: organizationID,
    location: property.value,
    store: store.value,
    loginName: loginName,
  };

  getApi(Endpoints.logout, payload, "POST");
};

export default logout;