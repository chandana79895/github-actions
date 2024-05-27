import "./LoginPage.css";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import goToPass from "../../assets/icons/goToPass.svg";
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { Md5 } from "ts-md5";
import { encode as base64_encode } from "base-64";
import { useNavigate } from "react-router";
import routes from "../../routes";
import { useTranslation } from "react-i18next";
import { getApi } from "../../api/utils/http";
import { Endpoints } from "../../api/const/endpoints";
import { AppContext } from "@/store/AppContext";
import * as Yup from "yup";

function LoginPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('invalidUsernameorPassword');
  const { organizationID, setOrganizationID } = useContext(AppContext);

  const navigate = useNavigate();

  // Redirect to location search page if organizationID is present
  useEffect(() => {
    if (organizationID !== '') {
      navigate('/' + routes[2].path, { replace: true })
    }
  }, [organizationID, navigate]);

  const handleSubmit = async () => {
    setLoading(true)
    setError(false)

    try {
      await validationSchema.validate({ username, password }); // Validate username and password
      const hashedPass = Md5.hashStr(password).toString();
      const hashedToken = base64_encode(`${username}:${hashedPass}`);
      const payload = { username: username, authToken: `Basic ${hashedToken}` }

      getApi(Endpoints.login, payload, "POST")
        .then((loginResponse) => {
          const orgID = loginResponse?.data?.response?.organization?.id ?? '';
          setOrganizationID(orgID)
          localStorage.setItem("organizationID", orgID);
        })
        .catch((err) => {
          const responseKey = err?.response?.data?.responseKey
          responseKey && setErrorMessage(responseKey);
          setError(true);
          setLoading(false)
        })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error?.message);
        setError(true);
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    document.documentElement.classList.add("login-page");
    return () => {
      document.documentElement.classList.remove("login-page");
    };
  }, []);

  return (
    <div className="login-page-container">
      <Grid container className="login-container">
        <Grid item xs={12} m={2} maxWidth={["330px", "400px"]}>
          <Box className="login-avatar-container">
            <Avatar alt="Logo" src={goToPass} className="login-avatar" />
            <Typography variant="h1" mb={"6px"}>
              {t("staffLogin")}
            </Typography>
          </Box>

          <LabelledInput
            label={t("username")}
            setValue={setUsername}
            data-testid="username"
            value={username}
            placeholder={t("enterEmployeeID")}
            error={error}
            className="mb-15px"
            headerVariant="subtitle1"
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
          />

          {error && <ErrorMessage className="mb-15px" message={t(errorMessage)} />}

          <Button
            disabled={!username || !password || loading}
            onClick={handleSubmit}
            title={t("login")}
            loading={loading}
            loadingText={t("loading")}
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
    .max(50, 'usernameMaxLength')
    .matches(/^\S*$/, 'usernameNoSpace'),
  password: Yup.string()
    .min(8, 'passwordMinLength'),
});