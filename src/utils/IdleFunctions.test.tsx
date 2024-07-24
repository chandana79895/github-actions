import { renderHook, act } from "@testing-library/react";
import { useIdleFunctions, handleVisibilityChange } from "./IdleFunctions";
import logout from "./logout";

jest.mock("./logout", () => jest.fn());
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useIdleFunctions", () => {
  let setItemSpy, getItemSpy, removeItemSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });

  it("should handle idle state correctly", () => {
    const setShowIdleModal = jest.fn();
    const contextValue = { reset: jest.fn() };
    const navigate = jest.fn();

    const { result } = renderHook(() =>
      useIdleFunctions(setShowIdleModal, contextValue, navigate)
    );

    act(() => {
      result.current.handleOnIdle();
    });
    expect(logout).toHaveBeenCalledWith(contextValue);
    expect(setItemSpy).toHaveBeenCalledWith("isIdle", "true");
    expect(setShowIdleModal).toHaveBeenCalledWith(true);

    getItemSpy.mockReturnValue("false");
    act(() => {
      result.current.handleOnActive();
    });
    expect(setShowIdleModal).not.toHaveBeenCalledWith(false);

    getItemSpy.mockReturnValue("false");
    act(() => {
      result.current.handleOnAction();
    });
    expect(setShowIdleModal).not.toHaveBeenCalledWith(false);

    act(() => {
      result.current.handleModalClose();
    });
    expect(setShowIdleModal).toHaveBeenCalledWith(false);
    expect(contextValue.reset).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalledWith("isIdle");
    expect(navigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});

describe("handleVisibilityChange", () => {
  let setItemSpy, getItemSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    getItemSpy = jest.spyOn(Storage.prototype, "getItem");
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
  });

  it("should set idle state when session times out", () => {
    const setShowIdleModal = jest.fn();
    const session_time = "3000";

    const visibilityHandler = handleVisibilityChange(
      session_time,
      setShowIdleModal
    );

    localStorage.setItem("lastActiveTime", `${Date.now() - 4000}`);

    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });

    act(() => {
      visibilityHandler();
    });

    expect(setItemSpy).toHaveBeenCalledWith("isIdle", "true");
    expect(setShowIdleModal).toHaveBeenCalledWith(true);
  });

  it("should not set idle state when session is active", () => {
    const setShowIdleModal = jest.fn();
    const session_time = "3000";

    const visibilityHandler = handleVisibilityChange(
      session_time,
      setShowIdleModal
    );

    localStorage.setItem("lastActiveTime", `${Date.now()}`);

    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });

    act(() => {
      visibilityHandler();
    });

    expect(setItemSpy).not.toHaveBeenCalledWith("isIdle", "true");
    expect(setShowIdleModal).not.toHaveBeenCalled();
  });
});
