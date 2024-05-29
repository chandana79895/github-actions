import { useCallback } from "react";
 
export const useIdleFunctions = (setShowIdleModal, contextValue, navigate) => {
  const handleOnIdle = useCallback(() => {
    localStorage.setItem("isIdle", "true");
    setShowIdleModal(true);
  }, [setShowIdleModal]);
 
  const handleOnActive = () => {
    if (!localStorage.getItem("isIdle")) {
      setShowIdleModal(false);
    }
  };
 
  const handleOnAction = () => {
    if (!localStorage.getItem("isIdle")) {
      setShowIdleModal(false);
    }
  };
 
  const handleModalClose = () => {
    setShowIdleModal(false);
    contextValue.reset();
    localStorage.removeItem("isIdle");
    navigate("/login", { replace: true });
  };
 
  return { handleOnIdle, handleOnActive, handleOnAction, handleModalClose };
};
 
export const handleVisibilityChange = (session_time, setShowIdleModal) => {
  return () => {
    if (document.visibilityState === "hidden") {
      const lastActiveTime = localStorage.getItem("lastActiveTime");
      const currentTime = new Date().getTime();
      const sessionTimeout = parseInt(session_time);
      if (currentTime - parseInt(lastActiveTime) >= sessionTimeout) {
        localStorage.setItem("isIdle", "true");
        setShowIdleModal(true);
      }
    }
  };
};