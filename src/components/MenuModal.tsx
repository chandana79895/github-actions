import close from "../assets/icons/close.svg";
import { Card, List, ListItem, ListItemText, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import { MenuModalStyle } from "./styles/MenuModalStyles";
import { useContext, useState } from "react";
import { AppContext } from "@/store/AppContext";
import { LANGUAGES } from "@/constants/Languages";
import logout from "@/utils/logout";
import { useTranslation } from "react-i18next";

function MenuModal({ open, handleClose, showOnlyLanguages }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const contextValue = useContext(AppContext);
  const [showLanguages, setShowLanguages] = useState(showOnlyLanguages);

  const hamburgArr = [
    {
      label: t("MemberLookup"),
      routePath: "member-search",
    },
    {
      label: t("SelectLocation"),
      routePath: "location-search",
    },
    {
      label: t("LanguagePreference"),
      routePath: "",
    },
    { label: t("Logout"), routePath: "login" },
  ];

  const handleMenuItemClick = (item) => {
    if (item.label === t("LanguagePreference")) {
      setShowLanguages(true);
    } else {
      if (item.routePath.length) {
        // In future - this will be changed to check the access token,
        // If not present, clear the context
        if (item.routePath === "login") {
          logout(contextValue);
          navigate(item.routePath);
          contextValue.reset();
        } else {
          navigate(item.routePath);
        }
      }
      handleClose();
    }
  };

  const handleLanguageClick = (language) => {
    contextValue.setLanguage(language.label);
    handleClose();
  };

  const baseTestID = "MENMOD";

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="menu-modal"
      aria-describedby="menu-modal"
      data-testid={baseTestID}
      id={baseTestID}
    >
      <Card sx={MenuModalStyle}>
        <img
          onClick={handleClose}
          className="close-icon"
          src={close}
          alt="Close icon"
          data-testid={`${baseTestID}X`}
          id={`${baseTestID}X`}
        />
        <List className="menu-list">
          {showLanguages
            ? LANGUAGES.map((language, idx) => (
                <ListItem
                  key={language.code}
                  divider={idx < LANGUAGES.length - 1}
                >
                  <ListItemText
                    onClick={() => handleLanguageClick(language)}
                    secondary={language.label}
                    data-testid={`${baseTestID}LI${idx}`}
                    id={`${baseTestID}LI${idx}`}
                  />
                </ListItem>
              ))
            : hamburgArr.map((item, idx) => (
                <ListItem
                  key={item.label}
                  divider={idx < hamburgArr.length - 1}
                >
                  <ListItemText
                    onClick={() => handleMenuItemClick(item)}
                    secondary={item.label}
                    data-testid={`${baseTestID}HI${idx}`}
                    id={`${baseTestID}HI${idx}`}
                  />
                </ListItem>
              ))}
        </List>
      </Card>
    </Modal>
  );
}

export default MenuModal;
