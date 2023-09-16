import axios from "axios";
import UserType, { Login, UserRegistered, EditUserForm, UserUpdated } from "../models/types/userType";
import UserInterface from "../models/interfaces/UserInterface";

const apiUrl = "http://localhost:8181";

export const login = async (user: Login) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUser = async (userId: string) => {
  try {
    const { data } = await axios.get<UserInterface>(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get<UserInterface[]>(`${apiUrl}/users`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const editUser = async (userId: string | null, normalizedUser: UserUpdated) => {
  try {
    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/users/${userId}`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const userStatus = async (userId: string) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};
