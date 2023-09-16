import React, { useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/Joi/signupSchema";
import Container from "@mui/material/Container";
import UserForm from "../components/UserForm";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { RegistrationForm, Login } from "../models/types/userType";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { signup, login } from "../service/userApi";
import {
  getUser,
  setTokenInLocalStorage,
} from "../service/localStorage";

const SignupPage = () => {

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
        setUser(userFromLocalStorage);
        setLoading(false);
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


  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        setLoading(false)
        if (typeof error === "string") {
          setError(error)
        };
      }
    },
    [handleLogin]
  );

  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
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
      <UserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleInputChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default SignupPage;
