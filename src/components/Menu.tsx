import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import backIcon from "../assets/icons/back.svg";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import logo from "../assets/icons/goToPass.svg";
import MenuModal from "./MenuModal";
import { AppContext } from "@/store/AppContext";
import "./styles/Menu.css";
import globe from "../assets/icons/globe.svg";
import { rsp } from "@/utils/shortPath";

export default function MenuComponent({ setLanguage, language }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { property, store } = useContext(AppContext);
  const [testID, setTestID] = useState("");
  const employeeName = localStorage.getItem("login_name") || "";
  useEffect(() => {
    if (pathname === "/login" || pathname === "/") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setTestID(`${rsp(pathname.split("/")[1])}MENU`);
  }, [isLogin, pathname]);

  const handleClickOpen = () => {
    setOpen(true);
    setLanguage(language);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackIconClick = () => {
    navigate(-1);
  };

  const handleLocationSearchClick = () => {
    navigate("/location-search");
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className={isLogin ? "login-nav" : "nav"}
        id={testID}
        data-testid={testID}
      >
        {isLogin ? (
          <Grid item xs={12} className="main-grid">
            <div
              onClick={handleClickOpen}
              className="button"
              id={`${testID}I0`}
              data-testid={`${testID}I0`}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                columnGap={1}
                fontSize={14}
                fontWeight={700}
              >
                <img src={globe} alt="" />
                {language.toUpperCase()}
              </Box>
            </div>
          </Grid>
        ) : (
          <Grid className="location-text" alignItems={"center"}>
            {!pathname.includes("/location-search") ? (
              <button
                className="back-btn"
                onClick={handleBackIconClick}
                id={`${testID}I1`}
                data-testid={`${testID}I1`}
              >
                <img
                  slot="start"
                  className="back-icon"
                  src={backIcon}
                  alt="Search"
                />
              </button>
            ) : (
              <div className="logo1" />
            )}
            <Grid item className="location-search-text">
              {property.label && pathname !== "/location-search" ? (
                <>
                  <Typography variant={"menu"} color={"white"} flex={1}>
                    {employeeName}
                    <br />
                  </Typography>
                  <button
                    className="location-search-btn"
                    onClick={handleLocationSearchClick}
                    id={`${testID}I2`}
                    data-testid={`${testID}I2`}
                  >
                    <Typography variant={"menu"} color={"white"} flex={1}>
                      {language === "English"
                        ? property.value
                        : property.label_jp}
                      <br />
                      {language === "English" ? store.value : store.label_jp}
                    </Typography>
                  </button>
                </>
              ) : (
                <div className="employeeName">
                  {(!store.value && pathname.includes("/member-search")) ||
                    (pathname.includes("/location-search") && (
                      <div style={{ flex: 2 }} />
                    ))}
                  <div className="centered-content">
                    <img
                      className="logo"
                      src={logo}
                      alt="Fortress"
                      id={`${testID}I2`}
                      data-testid={`${testID}I2`}
                    />
                    <Typography variant="h5" color={"white"}>
                      {employeeName}
                    </Typography>
                  </div>
                </div>
              )}
            </Grid>
            <button
              onClick={handleClickOpen}
              id={`${testID}I3`}
              data-testid={`${testID}I3`}
              className="hamburger-btn"
            >
              <img slot="end" src={hamburgerIcon} alt="Menu" />
            </button>
          </Grid>
        )}
      </Grid>
      {open && (
        <MenuModal
          open={open}
          handleClose={handleClose}
          showOnlyLanguages={isLogin}
        />
      )}
    </>
  );
}
