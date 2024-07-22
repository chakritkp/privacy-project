import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import CardComponent from "../component/CardComponent";
import useApi from "../hook/useApi";
import Loader from "../component/Loader";
import { Outlet } from "react-router-dom";

type Props = {};

export interface filterType {
  search: string;
  page: number;
  limit: number;
}

interface metaType {
  count: number;
  totalPages: number;
}

const Productlist = (props: Props) => {
  const [filter, setFilter] = useState<filterType>({
    search: "",
    page: 1,
    limit: 8,
  });
  const [list, setList] = useState<any>([
    {
      img: ["", "", ""],
      product_name: "",
      description: "",
      base_price: 0,
      total_quantity: 0,
    },
  ]);

  const [meta, setMeta] = useState<metaType>({
    count: 0,
    totalPages: 10,
  });

  const { useGetProducts } = useApi();

  const handleLoad = async () => {
    const { data, meta } = await useGetProducts(filter);

    setList(data);
    setMeta(meta);
  };

  useEffect(() => {
    // handleLoad();
  }, [filter.search, filter.page]);

  return (
    <>
      <Outlet />
      <Container component="main" maxWidth="lg">
        <Box margin={5}>
          <TextField
            fullWidth
            name="search"
            placeholder="search"
            onChange={(event) => {
              setTimeout(() => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  search: event.target.value,
                }));
              }, 1500);
            }}
          />
        </Box>
        <Typography gutterBottom variant="h5" component="div">
          Total: {meta?.count}
        </Typography>
        <Grid container spacing={3}>
          {list ? (
            list?.map((data: any, i: number) => (
              <Grid item key={i} xs={3}>
                {/* <CardComponent data={data} /> */}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          )}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 3,
          }}
        >
          <Pagination
            count={meta?.totalPages}
            page={filter?.page}
            onChange={(event, value) => {
              setFilter((prevFilter) => ({
                ...prevFilter,
                page: value,
              }));
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Productlist;
