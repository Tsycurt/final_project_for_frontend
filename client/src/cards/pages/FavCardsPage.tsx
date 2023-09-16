import React, { useEffect, useCallback, useState } from "react";
import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import CardInterface from "../models/interfaces/CardInterface";
import useAxios from "../../hooks/useAxios";
import { getCards, deleteCard } from '../services/cardApiService';
import { useSnack } from "../../providers/SnackbarProvider";
import { useUser } from "../../users/providers/UserProvider";

const FavCardsPage = () => {

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [cards, setCards] = useState<null | CardInterface[]>(null);

  const { user } = useUser();
  const snack = useSnack();


  useAxios();

  useEffect(() => {
    handleGetFavCards();
  }, []);

  const onDeleteCard = useCallback(async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetFavCards();
  }, []);


  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      const favCards = cards.filter(
        card => !!card.likes.find(id => id === user?._id)
      );
      setCards(favCards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") { 
        setError(error)
      };
    }
  }, [user]);


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

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="Here you can find all your favorite business cards"
      />

      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};

export default FavCardsPage;
