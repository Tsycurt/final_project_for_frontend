import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/Joi/loginSchema";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import FormLink from "../../forms/components/FormLink";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { setTokenInLocalStorage, getUser } from "../service/localStorage";
import { login } from "../service/userApi";
import { Login } from "../models/types/userType";


const LoginPage = () => {

  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);

  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();


  const handleLogin = useCallback(
    async (user: Login) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        setLoading(false);
        setUser(userFromLocalStorage);
        
        navigate(ROUTES.CARDS);
      } catch (error) {
        setLoading(false);
        if (typeof error === "string") { 
          setError(error)
        };
      }
    },
    [navigate, setToken]
  );

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        title="login"
        styles={{ maxWidth: "450px" }}
        to={ROUTES.CARDS}>
        <Input
          label="email"
          name="email"
          type="email"
          error={value.errors.email}
          onInputChange={rest.handleInputChange}
          data={value.data}
        />
        <Input
          label="password"
          name="password"
          type="password"
          error={value.errors.password}
          onInputChange={rest.handleInputChange}
          data={value.data}
        />
        <FormLink text="Did not registered yet?" to={ROUTES.SIGNUP} />
      </Form>
    </Container>
  );
};

export default LoginPage;
