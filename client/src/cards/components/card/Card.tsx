import React from "react";
import CardActionBar from "./CardActionBar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import CardInterface from "../../models/interfaces/CardInterface";
import { 
  Divider, 
  Box, 
  Card as MuiCard,
  CardContent, 
  CardHeader, 
  CardMedia,
  CardActionArea 
} from "@mui/material";

import CardRow from "./CardRow";

type CardProps = {
  card: CardInterface;
  onDelete: (id: string) => void;
  onLike: () => void;
};

const Card: React.FC<CardProps> = ({ card, onDelete, onLike }) => {
  const navigate = useNavigate();
  const { url, alt } = card.image;
  const { street, houseNumber, city } = card.address;
  return (
    <MuiCard sx={{ minWidth: 280 }} elevation={4}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAILS}/${card._id}`)}>

        {/* Card Head Image */}
        <CardMedia component="img" image={url} height="194" alt={alt} />

        {/* Card Body */}
        <CardContent>
          <CardHeader
            title={card.title}
            subheader={card.subtitle}
            sx={{ p: 0, mb: 1 }}
          />
          <Divider />
          <Box mt={1}>
            <CardRow title="phone" content={card.phone} />
            <CardRow title="address" content={`${street} ${houseNumber} ${city}`} />
            <CardRow title="card number" content={String(card.bizNumber)} />
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Card Footer */}
      <CardActionBar card={card} onDelete={onDelete} onLike={onLike} />
    </MuiCard>
  );
};

export default Card;
