import { Button, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import Loader from "../component/Loader";

type Props = {};

const Sample = (props: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <Button variant="contained" color="primary">
        primary
      </Button>
      <Button variant="contained" color="error">
        error
      </Button>
      <Button variant="contained" color="success">
        success
      </Button>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="body1">This is body1 text.</Typography>
      <Typography variant="body2">This is body2 text.</Typography>
      <Typography variant="caption">This is a caption.</Typography>
      <Typography variant="overline">This is an overline.</Typography>
    </Container>
  );
};

export default Sample;
