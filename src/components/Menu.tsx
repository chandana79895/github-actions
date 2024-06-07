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
import { rsp } from "@/constants/tests/shortPath";

export default function MenuComponent({ setLanguage, language }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { property, store } = useContext(AppContext);
  const [testID, setTestID] = useState('')

  useEffect(() => {
    if (pathname === "/login" || pathname === "/") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setTestID(`${rsp(pathname.split("/")[1])}MENU`)
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
        id={testID}
        data-testid={testID}
      >
        {isLogin ? (
          <Grid item xs={12}>
            <div
              onClick={handleClickOpen}
              className="button"
              id={`${testID}I0`}
              data-testid={`${testID}I0`}
            >
              <Box display={"flex"} flexDirection={"row"} columnGap={1}>
                <img src={globe} alt='' />
                {language}
              </Box>
            </div>
          </Grid>
        ) : (
          <>
            <Grid item>
            {!pathname.includes("/location-search") ? (
                <button
                  className="img-btn"
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
                <div 
                className="logo1"
                 />
              )}
            </Grid>
            <Grid item>
              {property.label && pathname !== "/location-search" ? (
                <button
                  className="location-search-btn"
                  onClick={handleLocationSearchClick}
                  id={`${testID}I2`}
                  data-testid={`${testID}I2`}
                >
                  <Typography variant="h5" color={"white"} className="ellipsis">
                    {storeNameDisplay(store.value, 15)}
                  </Typography>
                </button>
              ) : (
                <img className="logo" src={logo} alt="Fortress"
                  id={`${testID}I2`}
                  data-testid={`${testID}I2`}
                />
              )}
            </Grid>
            <Grid item>
              <button className="img-btn" onClick={handleClickOpen}
                id={`${testID}I3`}
                data-testid={`${testID}I3`}>
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
