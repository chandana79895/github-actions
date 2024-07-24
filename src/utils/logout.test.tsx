import { getApi } from "./api/http";
import { Endpoints } from "../constants/endpoints";
import logout from "@/utils/logout";

jest.mock("@/utils/api/http", () => ({
  getApi: jest.fn(),
}));

describe("logout", () => {
  it("should call getApi with correct arguments", () => {
    const contextValue = {
      property: { value: "someLocation", label_jp: "someLocation_jp" },
      store: {
        value: "someStore",
        storeID: "1234",
        label_jp: "someStore_jp",
        storeThreshold: "200000",
      },
    };

    const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockReturnValue("testUser");

    const expectedPayload = {
      username: "testUser",
      location: "someLocation",
      location_jp: "someLocation_jp",
      store: "someStore",
      store_jp: "someStore_jp",
      loginName: "testUser",
      storeID: "1234",
      storeThreshold: "200000",
      storeEmail: "",
    };

    logout(contextValue);

    expect(getApi).toHaveBeenCalledWith(
      Endpoints.logout,
      expectedPayload,
      "POST"
    );

    mockGetItem.mockRestore();
  });
});
