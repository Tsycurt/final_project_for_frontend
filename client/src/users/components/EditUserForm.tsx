import React, { FC, ChangeEvent } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import Joi from "joi";
import {
  EditUserForm,
  EditUserFormErrors,
} from "../models/types/userType";
import FormLink from "../../forms/components/FormLink";

type Props = {
  title?: string;
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: EditUserFormErrors;
  data: EditUserForm;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  
};
const UserForm: FC<Props> = ({
  onSubmit, 
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onFormChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      to={ROUTES.ROOT}>
      <Input
        name="first"
        label="first name"
        error={errors.first}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="middle"
        label="middle name"
        error={errors.middle}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="last"
        label="last name"
        error={errors.last}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="url"
        label="image url"
        error={errors.url}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="alt"
        label="image alt"
        error={errors.alt}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="state"
        label="state"
        error={errors.state}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        label="country"
        name="country"
        error={errors.country}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="houseNumber"
        label="house Number"
        type="number"
        error={errors.houseNumber}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="zip"
        label="zip"
        error={errors.zip}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
    </Form>
  );
};

export default React.memo(UserForm);
