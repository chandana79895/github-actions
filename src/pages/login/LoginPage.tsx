import "./LoginPage.css";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import goToPass from "../../assets/icons/goToPass.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router";
import routes from "../../routes";
import { useTranslation } from "react-i18next";
import { Md5 } from "ts-md5";
import { encode as base64_encode } from "base-64";
import { getApi } from "../../api/utils/http";
import { Endpoints } from "../../api/const/endpoints";
import { AppContext } from "@/store/AppContext";
import * as Yup from "yup";
import { getWords } from "@/constants/tests/words";
import { rsp } from "@/constants/tests/shortPath";

function LoginPage() {
  const { t } = useTranslation();
  // const [devices, setDevices] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("invalidUsernameorPassword");
  const {
    organizationID,
    setOrganizationID,
    setProperty,
    setStore,
    setemployeeID,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Redirect to location search page if organizationID is present
  useEffect(() => {
    if (organizationID !== "") {
      navigate("/" + routes[2].path, { replace: true });
    }
  }, [organizationID, navigate]);
  useEffect(() => {
    // getDeviceInfo();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    // setOrganizationID("orgID") //TODO:Remove after live APIs
    // localStorage.setItem("organizationID", 'orgID');//TODO:Remove after live APIs
    // navigate('/' + routes[2].path, { replace: true })//TODO:Remove after live APIs

    try {
      await validationSchema.validate({ username, password }); // Validate username and password
      const hashedPass = Md5.hashStr(password).toString();
      const hashedToken = base64_encode(`${username}:${hashedPass}`);
      const payload = { username: username, authToken: `Basic ${hashedToken}` };
      getApi(Endpoints.login, payload, "POST")
        .then((loginResponse) => {
          const orgID = loginResponse?.data?.response?.organization?.id ?? "";
          const property =
            loginResponse?.data?.response?.session_profile?.store;
          setOrganizationID(orgID);
          localStorage.setItem("organizationID", orgID);
          localStorage.setItem("login_name", username);

          // populate property and store from previous session
          const session = loginResponse?.data?.response?.session_profile;
          const empId = session.user_name;
          if (session) {
            setProperty({ label: session.location, value: session.location });
            setStore({ label: session.store, value: session.store });
            setemployeeID(empId);
          }
          if (property) {
            navigate("/" + routes[4].path, { replace: true });
          }
        })
        .catch((err) => {
          const responseKey = err?.response?.data?.responseKey;
          responseKey && setErrorMessage(responseKey);
          setError(true);
          setLoading(false);
        });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error?.message);
        setError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("login-page");
    return () => {
      document.documentElement.classList.remove("login-page");
    };
  }, []);
  // const getDeviceInfo = async () => {
  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     setDevices(devices);
  //   } catch (err) {
  //     console.error("Error fetching devices:", err);
  //   }
  // };

  // for generating test ID's
  const currentPage = rsp("location-search");
  const shortPathSL = getWords("staffLogin");

  return (
    <div
      className="login-page-container"
      id={`${currentPage}CONT`}
      data-testid={`${currentPage}CONT`}
    >
      <Grid container className="login-container">
        <Grid item xs={12} m={2} maxWidth={["330px", "400px"]}>
          <Box
            className="login-avatar-container"
            id={`${currentPage}ACONT`}
            data-testid={`${currentPage}ACONT`}
          >
            <Avatar
              alt="Logo"
              src={goToPass}
              className="login-avatar"
              data-testid={`${currentPage}AVT`}
            />
            <Typography
              variant="h1"
              mb={"6px"}
              id={`${currentPage}${shortPathSL}`}
              data-testid={`${currentPage}${shortPathSL}`}
            >
              {t("staffLogin")}
            </Typography>
          </Box>

          <LabelledInput
            label={t("username")}
            setValue={setUsername}
            value={username}
            placeholder={t("enterEmployeeID")}
            error={error}
            className="mb-15px"
            headerVariant="subtitle1"
            testID={`${currentPage}${getWords("username")}`}
          />

          <LabelledInput
            label={t("password")}
            data-testid="password"
            setValue={setPassword}
            value={password}
            placeholder={t("enterPassword")}
            type="password"
            error={error}
            className="mb-15px"
            headerVariant="subtitle1"
            testID={`${currentPage}${getWords("enterPassword")}`}
          />

          {error && (
            <ErrorMessage
              className="mb-15px"
              message={t(errorMessage)}
              testID={currentPage}
            />
          )}

          <Button
            disabled={!username || !password || loading}
            onClick={handleSubmit}
            title={t("login")}
            loading={loading}
            loadingText={t("loading")}
            testID={`${currentPage}${getWords("login")}`}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;

// Note: the error message is a key from the translations
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, "usernameMaxLength")
    .matches(/^\S*$/, "usernameNoSpace"),
  password: Yup.string().min(8, "passwordMinLength"),
});
