import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { getCard } from "../services/cardApiService";
import useAxios from "../../hooks/useAxios";
import CardInterface from "../models/interfaces/CardInterface";

const CardDetailsPage = () => {
  const { cardId } = useParams();


  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [card, setCard] = useState<null | CardInterface>(null);

  useAxios();

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  const handleGetCard = async (cardId: string) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      setCard(card);
      setLoading(false);
      return card;
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") { 
        setError(error);
      };
    }
  };

  return (
    <>
      { isLoading ? <Spinner /> : null }
      { error ? <Error errorMessage={error} /> : null }
      { !isLoading && !card ? <p>No card to display...</p> : null }
      { !isLoading && card ? 
          <Container>
            <PageHeader
              title="Business Details here"
              subtitle="Here you can see details of the business"
            />
            <div>
              <Card
                card={card}
                onDelete={id => console.log("you deleted card: " + id)}
                onLike={() => {}}
              />
            </div>
          </Container>
        : null        
      }
    </>
  )
};

export default CardDetailsPage;
