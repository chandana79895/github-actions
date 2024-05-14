import { LANGUAGES } from "../constants/Languages";
import { Grid,Select,MenuItem, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router";
import { Language } from "../types/Types";
import backIcon from "../assets/icons/back.svg"
import hamburgerIcon from "../assets/icons/hamburger.svg"
import logo from "../assets/icons/goToPass.svg";
import globe from "../assets/icons/globe.svg";
import MenuModal from "./MenuModal";


export default function MenuComponent ({setLanguage,language}) {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    if(pathname === '/login' || pathname === '/' ){
        setIsLogin(true)
    }else{
        setIsLogin(false)
    }
  },[isLogin,pathname])

   //Click the Hamburg to open the popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Click the close Icon in the Hamburg icon
  const handleClose = () => {
    setOpen(false);
  };

  const handleBackIconClick = ()=>{
    navigate(-1);
  }

  return (
    <>
       <Grid container justifyContent="space-between" className= {isLogin ? "login-nav" : "nav"} >
          {isLogin && 
          <Grid item xs={12}>
           <Select
            className="font-white"
            variant="standard"
            value={language}
            onChange={({ target }) => setLanguage(target.value as Language)}
            startAdornment={
              <InputAdornment position="start">
                <img src={globe} alt="" />
              </InputAdornment>
            }
          >
            {LANGUAGES.map((language) => (
              <MenuItem key={language.code} value={language.label}>{language.label}</MenuItem>
            ))}
          </Select> </Grid>}
          {!isLogin && 
          <>
              <Grid item >
                  <button className="img-btn" onClick={handleBackIconClick}> <img slot="start"  className="back-icon" src={backIcon} alt="Search" /> </button>
              </Grid>
              <Grid item >
                <img  className="logo" src={logo} alt="Fortress" />
              </Grid>
              <Grid item >
              <button className="img-btn"onClick={handleClickOpen} ><img slot="end" className="hamburger-icon" src={hamburgerIcon} alt="Menu" /> </button>
              </Grid>
          </>
          }
        </Grid>
        {open && <MenuModal open={open} handleClose={handleClose}/> }
    </>
  );
}