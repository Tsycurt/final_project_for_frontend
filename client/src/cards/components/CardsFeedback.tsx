import React from "react";

import Typography from "@mui/material/Typography";
import Cards from "./Cards";
import CardInterface from "../models/interfaces/CardInterface";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

type CardsFeedbackProps = {
  isLoading: boolean;
  error: string | null;
  cards: CardInterface[] | null;
  onDelete?: (id: string) => void;
  onLike?: () => void;
};

const CardsFeedback: React.FC<CardsFeedbackProps> = ({
  isLoading,
  error,
  cards,
  onDelete = cardId => console.log("you deleted card: " + cardId),
  onLike = () => {},
}) => (
  <>
    { isLoading ? <Spinner /> : null }
    { error ? <Error errorMessage={error} /> : null }
    { cards && !cards.length ? 
      <Typography variant="body1" color="initial">
        Oops, there are no business cards in the database that match the
        parameters you entered!
      </Typography> : null
    }
    { cards && cards.length ?
        <Cards cards={cards} onLike={onLike} onDelete={onDelete} />
      : null
    }
  </>
);

export default CardsFeedback;
