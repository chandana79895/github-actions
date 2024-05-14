import "./LoginPage.css";
import { Avatar, Box, Grid,Typography } from "@mui/material";
import { useContext, useState } from "react";
import goToPass from '../../assets/icons/goToPass.svg';
import LabelledInput from "../../components/LabelledInput";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import {Md5} from 'ts-md5';
import {encode as base64_encode} from 'base-64'
import { useNavigate } from "react-router";
import routes from "../../routes";
import { AppContext } from "../../store/AppContext";
import { useTranslation } from "react-i18next";
import { getApi } from "../../api/utils/http";
import { Endpoints } from "../../api/const/endpoints";

function LoginPage() {
  const {t} = useTranslation();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false) // need to fix the error handling and time out 

  const navigate = useNavigate()
  

  const handleSubmit = () => {
    setLoading(true)
    const hashedPass=  Md5.hashStr(password).toString();
    const hashedToken =  base64_encode(`${username}:${hashedPass}`);
    console.info(hashedToken);
    setTimeout(() => { // simulate api call, will be removed
      // setError(true)
      navigate('/'+routes[2].path,{replace:true})
      setLoading(false)
    }, 2000)
    getApi(Endpoints.login,hashedToken).then(
        (loginResponse)=>{
          // need to replace this with the api call
          console.log(loginResponse)
          setError(true)
          // setLoading(false)
        }
    )
  }

  const {language} = useContext(AppContext);
  console.log(language);

  

  return (
    <div className="login-page-container">
      <Grid container className="login-container" >
        <Grid item xs={12} m={2} maxWidth={['330px', '400px']} >
          <Box className="login-avatar-container" >
            <Avatar alt="Logo" src={goToPass} className="login-avatar" />
            <Typography variant="h1" mb={'6px'}>{t("staffLogin")}</Typography>
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
            placeholder={t("enterTemporaryPassword")}
            type="password"
            error={error}
            className="mb-15px"
            headerVariant="subtitle1"
          />

          {error && <ErrorMessage message="Invalid Username or Password" />}

          <Button
            className="login-button"
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