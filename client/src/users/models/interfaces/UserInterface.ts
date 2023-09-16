import AddressInterface from "./AddressInterface";

interface UserInterface {
  _id: string;
  name: {
    first: string,
    middle: string,
    last: string,
  },
  image: {
    url: string,
    alt: string,
  },
  phone: string,
  email: string,
  isAdmin: boolean,
  isBusiness: boolean,
  address: AddressInterface;
}

export default UserInterface;
