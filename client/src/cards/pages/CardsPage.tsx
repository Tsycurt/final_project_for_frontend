import React, { useEffect, useState, useCallback } from "react";
import Container from "@mui/material/Container";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import CardInterface from "../models/interfaces/CardInterface";
import useAxios from "../../hooks/useAxios";
import { getCards, deleteCard } from '../services/cardApiService';
import { useSnack } from "../../providers/SnackbarProvider";

type CardsPageProps = {};

const CardsPage: React.FC<CardsPageProps> = () => {

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [cards, setCards] = useState<null | CardInterface[]>(null);

  useAxios();

  const snack = useSnack();

  useEffect(() => {
    handleGetCards();
  }, []);

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      setCards(cards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        setError(error);
      };
    }
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

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="On this page you can find all business cards form all categories"
      />
      <CardsFeedback
        cards={cards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default CardsPage;
