import React, { useCallback, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import initialCreateCardObject from "../helpers/initialForms/initialCreateCardObject";
import cardSchema from "../models/Joi/cardSchema";
import Container from "@mui/material/Container";
import CardForm from "../components/CardForm";
import {
  CardFromClientType
} from "../models/types/cardTypes";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import CardInterface from "../models/interfaces/CardInterface";
import { useNavigate } from "react-router-dom";
import normalizeCard from "../helpers/normalizations/normalizeCard";

import { createCard } from '../services/cardApiService';

const CreateCardPage = () => {

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [card, setCard] = useState<null | CardInterface>(null);

  useAxios();

  const { user } = useUser();
  const navigate = useNavigate();
  const snack = useSnack();

  const handleCreateCard = useCallback(
    async (cardFromClient: CardFromClientType) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        const card = await createCard(normalizedCard);
        setLoading(false);
        setCard(card);
        snack("success", "A new business card has been created");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        setLoading(false);
        if (typeof error === "string") {
          setError(error);
        };
      }
    },
    []
  );

  const { value, ...rest } = useForm(
    initialCreateCardObject,
    cardSchema,
    handleCreateCard
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, validateForm } = rest;

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container>
      <CardForm
        title="create business card"
        data={data}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        onReset={handleReset}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default CreateCardPage;
