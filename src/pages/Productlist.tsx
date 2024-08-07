import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardComponent from "../component/CardComponent";
import useApi from "../hook/useApi";

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
  const [list, setList] = useState<any>([]);

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
    handleLoad();
  }, [filter.search, filter.page]);

  return (
    <Box>
      <Paper elevation={3} sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          size="small"
          sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
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
      </Paper>
      <Typography gutterBottom variant="caption" component="div">
        Total: {meta?.count}
      </Typography>
      <Grid container spacing={3}>
        {list ? (
          list.map((data: any, i: number) => (
            <Grid item key={i} xs={12} sm={6} md={3}>
              <CardComponent data={data} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
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
          marginTop: 3,
        }}
      >
        <Paper elevation={3}>
          <Pagination
            count={meta?.totalPages}
            page={filter?.page}
            onChange={(event, value) => {
              setFilter((prevFilter) => ({
                ...prevFilter,
                page: value,
              }));
            }}
            sx={{
              "& .MuiPaginationItem-text": {
                color: "white",
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Productlist;
