import { getApi } from './http';
import { Endpoints } from '../const/endpoints';

const logout = (contextValue) => {
 const { organizationID, property, store } = contextValue;
 const payload = {
    //NOTE: used organizationID as username for logout, might need to replace it later
    username: organizationID,
    location: property.value,
    store: store.value,
  };

  getApi(Endpoints.logout, payload, "POST");
};

export default logout;