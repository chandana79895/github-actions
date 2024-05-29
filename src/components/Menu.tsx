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

export default function MenuComponent({ setLanguage, language }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { property, store } = useContext(AppContext);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
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

  function storeNameDisplay(text: string, maxLength: number) {
    const parts = text.split("-");
    if (parts.length > 1) {
      const firstPart = parts[0].trim();
      const secondPart = parts.slice(1).join("-").trim();
      const truncatedSecondPart =
        secondPart.length > maxLength
          ? secondPart.substring(0, maxLength) + "..."
          : secondPart;
      return (
        <>
          {firstPart}
          <br />
          {truncatedSecondPart}
        </>
      );
    }
    return text;
  }

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className={isLogin ? "login-nav" : "nav"}
      >
        {isLogin && (
          <>
            <Grid item xs={12}>
              <div onClick={handleClickOpen} className="button">
                <Box display={"flex"} flexDirection={"row"} columnGap={1}>
                  <img src={globe} />
                  {language}
                </Box>
              </div>
            </Grid>
          </>
        )}
        {!isLogin && (
          <>
            <Grid item>
              <button className="img-btn" onClick={handleBackIconClick}>
                {" "}
                <img
                  slot="start"
                  className="back-icon"
                  src={backIcon}
                  alt="Search"
                />{" "}
              </button>
            </Grid>
            <Grid item>
              {property.label && pathname !== "/location-search" ? (
                <button
                  className="location-search-btn"
                  onClick={handleLocationSearchClick}
                >
                  <Typography variant="h5" color={"white"} className="ellipsis">
                    {storeNameDisplay(store.value, 15)}
                  </Typography>
                </button>
              ) : (
                <>
                  <img className="logo" src={logo} alt="Fortress" />
                </>
              )}
            </Grid>
            <Grid item>
              <button className="img-btn" onClick={handleClickOpen}>
                <img
                  slot="end"
                  className="hamburger-icon"
                  src={hamburgerIcon}
                  alt="Menu"
                />{" "}
              </button>
            </Grid>
          </>
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
