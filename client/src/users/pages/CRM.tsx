import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { deleteUser, getUsers, userStatus } from '../service/userApi';
import UserInterface from "../models/interfaces/UserInterface";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import PageHeader from "../../components/PageHeader";

const CRMPage = () => {
  const { user } = useUser();
  const { userId } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [usersGet, setUsersGet] = useState<null | UserInterface[]>(null);

  useAxios();

  const navigate = useNavigate();
  const snack = useSnack();
  
  
  useEffect(() => {
    handleGetUsers();
  }, []);

   const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      console.log(users);
      setUsersGet(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        setError(error);
      };
    }
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      await deleteUser(userId);
      handleGetUsers();
      snack("success", "The user has been successfully deleted");
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") { 
        setError(error)
      };
    }
  }, []);


  const handleChangeUserStatus = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      await userStatus(userId);
      handleGetUsers();
      snack("success", "The user status has been successfully updated");
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") { 
        setError(error)
      };
    }
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        position: 'relative'
      }}>
        <PageHeader
            title="CRM Page"
            subtitle="Here you can find all your users"
        />

        { isLoading ? <Spinner /> : null }
        { error ? <Error errorMessage={error} /> : null }
        { usersGet && usersGet.length && !isLoading ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Is Business</TableCell>
                            <TableCell align="center">Is Admin</TableCell>
                            <TableCell align="center" colSpan={2}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {usersGet && usersGet.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                {`${row.name.first} ${row.name.middle} ${row.name.last}`}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.isBusiness ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="center">{row.isAdmin ? 'Yes': 'No'}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleChangeUserStatus(row._id)} variant="outlined" color="primary">
                                    Change Status
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDeleteUser(row._id)} variant="outlined" color="error">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            : null
        }
    </Container>
  );
};

export default CRMPage;
