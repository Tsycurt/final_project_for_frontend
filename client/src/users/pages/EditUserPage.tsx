import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import initialEditUserForm from "../helpers/initialForms/initialEditUserForm";
import { useUser } from "../providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import mapUserToModel from "../helpers/normalization/normalizeEditUser";
import EditUserForm from "../components/EditUserForm";
import editUserSchema from "../models/Joi/editUserSchema";
import {
  EditUserForm as EditUserFormType
} from "../models/types/userType";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { editUser, getUser } from '../service/userApi';
import UserInterface from "../models/interfaces/UserInterface";
import normalizeUserEdit from "../helpers/normalization/normalizeUserEdit";


const EditUserPage = () => {
  const { user } = useUser();
  const { userId } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [userGet, setUserGet] = useState<null | UserInterface>(null);

  useAxios();

  const navigate = useNavigate();
  const snack = useSnack();


  const handleUpdateCard = useCallback(
    async (userFromClient: EditUserFormType) => {
      try {
        setLoading(true);
        console.log(userFromClient);
        const normalizedUser = normalizeUserEdit(userFromClient);
        const userFomServer = await editUser(userId || null, normalizedUser);
        setUserGet(userFomServer || null);
        setLoading(false);
        snack("success", "The user has been successfully updated");
        navigate(ROUTES.ROOT);
      } catch (error) {
        setLoading(false);
        if (typeof error === "string") { 
          setError(error)};
      }
    },
    []
  );

  const handleGetUser = async (userId: string) => {
    try {
      setLoading(true);
      const user = await getUser(userId);
      setLoading(false)
      setUserGet(user);
      return user;
    } catch (error) {
      setLoading(false)
      if (typeof error === "string") {
        setError(error)
      };
    }
  };

  const { value, ...rest } = useForm(
    initialEditUserForm,
    editUserSchema,
    handleUpdateCard
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (userId)
      handleGetUser(userId).then(userFromServer => {
        if (user?._id != userFromServer!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromServer!);
        console.log(modeledUser);
        setData(modeledUser);
      });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <EditUserForm
        title="edit user"
        onSubmit={onSubmit}
        onReset={handleReset}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        data={data}
      />
    </Container>
  );
};

export default EditUserPage;
