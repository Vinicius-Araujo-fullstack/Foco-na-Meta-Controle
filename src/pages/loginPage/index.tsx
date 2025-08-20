/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ImagemLogo from "../../assets/Logo/Foco-na-Meta-Logo.svg";
import InputUser from "./InputUser";
import InputPassword from "./InputPassword/index.tsx";
import ButtonLogin from "./ButtonLogin/index.tsx";
import { useNavigate } from "react-router";
import api from "../../utils/api.ts";

import {
  ContainerMain,
  ContainerLeft,
  Logo,
  ContainerRigth,
  H1,
  Form,
  P,
  DivTextForm,
  DivFooterForm,
  DivInputsForm,
  ErrorMessage,
} from "./style";

// import "../../../src/App.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/login-admin", {
        username,
        password,
      });

      const token = response.data.response.token;

      localStorage.setItem("token", token);

      setTimeout(() => navigate("/controle"), 500);
    } catch (error: any) {
      setShowError(true);
      setErrorMsg(error.response.data.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setShowError(false);
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <ContainerMain>
      <ContainerLeft>
        <div>
          <Logo src={ImagemLogo} alt="Logo Foco Na Meta" />
        </div>
      </ContainerLeft>
      <ContainerRigth>
        <Form>
          <DivTextForm>
            <H1>Olá!</H1>
            <H1>Bem-vindo ao Painel de</H1>
            <H1>Controle Foco na Meta</H1>
            <P>Faça o login e gerencie seus dados cadastrados.</P>
          </DivTextForm>

          <DivFooterForm>
            <DivInputsForm>
              <InputUser onChange={handleUsernameChange} value={username} />
              <InputPassword value={password} onChange={handlePasswordChange} />
            </DivInputsForm>

            {showError && <ErrorMessage>{errorMsg}</ErrorMessage>}

            <ButtonLogin handleClick={handleSubmit} loading={loading} />
          </DivFooterForm>
        </Form>
      </ContainerRigth>
    </ContainerMain>
  );
};

export default Login;
