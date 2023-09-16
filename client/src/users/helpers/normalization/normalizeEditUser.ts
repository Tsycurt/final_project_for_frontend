import UserInterface from "../../models/interfaces/UserInterface";
import { EditUserForm } from "../../models/types/userType";

const normalizeUser =  (user: UserInterface): EditUserForm => {
  return {
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last,
    phone: user.phone,
    url: user.image.url,
    alt: user.image.alt,
    state: String(user.address.state),
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    zip: String(user.address.zip),
    houseNumber: String(user.address.houseNumber!)
  };
};

export default normalizeUser;
