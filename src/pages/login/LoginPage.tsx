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
import { getApi } from "../../utils/api/http";
import { Endpoints } from "../../constants/endpoints";
import { AppContext } from "@/store/AppContext";
import * as Yup from "yup";
import { getWords } from "@/utils/words";
import { rsp } from "@/utils/shortPath";
import loginFields from "@/constants/templates/loginTemplate.json";
import { Controller, useForm } from "react-hook-form";
import { loginValidationSchema } from "@/schemas/login";
import { transaction_amount } from "@/constants/env";

function LoginPage() {
  const { t } = useTranslation();
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

  const { control, watch } = useForm();
  const { username, password } = watch();

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);

    try {
      await loginValidationSchema.validate({ username, password }); // Validate username and password
      const hashedPass = Md5.hashStr(password).toString();
      const hashedToken = base64_encode(`${username}:${hashedPass}`);
      const payload = { username: username, authToken: `Basic ${hashedToken}` };
      getApi(Endpoints.login, payload, "POST")
        .then((loginResponse) => {
          setLoading(false);
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
            setProperty({
              label: session.location,
              label_jp: session.location_jp,
              value: session.location,
            });
            setStore({
              label: session.store,
              label_jp: session.store_jp,
              value: session.store,
              storeID: session.storeID,
              storeThreshold: session?.storeThreshold || transaction_amount,
              storeEmail: session.storeEmail,
            });
            setemployeeID(empId);
          }
          if (property) {
            navigate("/" + routes[3].path, { replace: true });
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
            mt={["40px", "10vh"]}
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

          {loginFields.map((item) => (
            <Controller
              key={item.key}
              name={item.key}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <LabelledInput
                  value={field.value}
                  setValue={field.onChange}
                  label={t(field.name)}
                  placeholder={t(item.placeholder)}
                  type={item.type}
                  error={error}
                  className="mb-15px"
                  headerVariant="subtitle1"
                  testID={`${currentPage}${getWords(field.name)}`}
                />
              )}
            />
          ))}

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
