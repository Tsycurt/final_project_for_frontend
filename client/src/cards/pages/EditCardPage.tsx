import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCreateCardObject";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import mapCardToModel from "../helpers/normalizations/mapCardToModel";
import CardForm from "../components/CardForm";
import cardEditSchema from "../models/Joi/cardEditSchema";
import {
  CardMapToModelType
} from "../models/types/cardTypes";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import CardInterface from "../models/interfaces/CardInterface";
import { editCard, getCard } from '../services/cardApiService';
import normalizeEditCard from "../helpers/normalizations/normalizeEditCard";

const EditCardPage = () => {
  const { user } = useUser();
  const { cardId } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [card, setCard] = useState<null | CardInterface>(null);

  useAxios();

  const navigate = useNavigate();
  const snack = useSnack();


  const handleUpdateCard = useCallback(
    async (cardFromClient: CardMapToModelType) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeEditCard(cardFromClient);
        const cardFomServer = await editCard(normalizedCard);
        setCard(cardFomServer || null);
        setLoading(false);
        snack("success", "The business card has been successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        setLoading(false);
        if (typeof error === "string") { 
          setError(error)};
      }
    },
    []
  );

  const handleGetCard = async (cardId: string) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      setLoading(false)
      setCard(card);
      return card;
    } catch (error) {
      setLoading(false)
      if (typeof error === "string") {
        setError(error)
      };
    }
  };

  const { value, ...rest } = useForm(
    initialCardForm,
    cardEditSchema,
    handleUpdateCard
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (cardId)
      handleGetCard(cardId).then(cardFromServer => {
        console.log(cardFromServer);
        if (user?._id !== cardFromServer!.user_id) return navigate(ROUTES.ROOT);
        const modeledCard = mapCardToModel(cardFromServer!);
        console.log(cardFromServer);
        setData(modeledCard);
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
      <CardForm
        title="edit card"
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

export default EditCardPage;
