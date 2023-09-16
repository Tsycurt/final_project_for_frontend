import { EditUserForm } from "../../models/types/userType";

const normalizeUserEdit = (user: EditUserForm) => {
  return {
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: +user.zip,
      houseNumber: +user.houseNumber,
    }
  };
};

export default normalizeUserEdit;
