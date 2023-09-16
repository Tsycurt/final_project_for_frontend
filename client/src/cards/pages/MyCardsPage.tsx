import React, { useEffect, useCallback, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import { Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAxios from "../../hooks/useAxios";
import CardInterface from "../models/interfaces/CardInterface";
import { useSnack } from "../../providers/SnackbarProvider";
import { deleteCard, getMyCards } from "../services/cardApiService";

const MyCardsPage = () => {

  const { user } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [cards, setCards] = useState<null | CardInterface[]>(null);
 
  const navigate = useNavigate();
  const snack = useSnack();

  useAxios();

  useEffect(() => {
    handleGetMyCards();
  }, []);

  const handleDeleteCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      snack("success", "The business card has been successfully deleted");
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        setError(error)
      };
    }
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      setCards(cards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        setError(error);
      }
    }
  }, []);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetMyCards();
  };

  if (!user || !user.isBusiness)
    return <Navigate replace to={ROUTES.MY_CARDS} />;

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="My Cards Page"
        subtitle="Here you can find your business cards"
      />

      {cards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}>
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
