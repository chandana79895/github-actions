import close from "../assets/icons/close.svg";
import { Card, List, ListItem, ListItemText, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import { MenuModalStyle } from "./styles/MenuModalStyles";
import { useContext, useState } from "react";
import { AppContext } from "@/store/AppContext";
import { LANGUAGES } from "@/constants/Languages";

const hamburgArr = [
  {
    label: "Member Lookup",
    routePath: "member-search",
  },
  {
    label: "Select Location",
    routePath: "location-search",
  },
  {
    label: "Language Preference",
    routePath: "",
  },
  { label: "Logout", routePath: "login" },
];

function MenuModal({ open, handleClose, showOnlyLanguages }) {
  const navigate = useNavigate();
  const { reset, setLanguage } = useContext(AppContext);
  const [showLanguages, setShowLanguages] = useState(showOnlyLanguages);

  const handleMenuItemClick = (item) => {
    if (item.label === "Language Preference") {
      setShowLanguages(true);
    } else {
      if (item.routePath.length) {
        // In future - this will be changed to check the access token,
        // If not present, clear the context
        if (item.routePath === "login") {
          navigate(item.routePath);
          reset();
        } else {
          navigate(item.routePath);
        }
      }
      handleClose();
    }
  };

  const handleLanguageClick = (language) => {
    setLanguage(language.label);
    handleClose();
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="menu-modal"
      aria-describedby="menu-modal"
    >
      <Card sx={MenuModalStyle}>
        <img onClick={handleClose} className="close-icon" src={close} alt="Close icon" />
        <List className="menu-list">
          {showLanguages
            ? LANGUAGES.map((language, idx) => (
                <ListItem key={language.code} divider={idx < LANGUAGES.length - 1}>
                  <ListItemText
                    onClick={() => handleLanguageClick(language)}
                    secondary={language.label}
                  />
                </ListItem>
              ))
            : hamburgArr.map((item, idx) => (
                <ListItem key={item.label} divider={idx < hamburgArr.length - 1}>
                  <ListItemText
                    onClick={() => handleMenuItemClick(item)}
                    secondary={item.label}
                  />
                </ListItem>
              ))}
        </List>
      </Card>
    </Modal>
  );
}

export default MenuModal;
