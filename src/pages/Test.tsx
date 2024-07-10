import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type Props = {};

const Test = (props: Props) => {
  const column = ["NO", "First Name", "Last Name", "Position"];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500, width: 100}}>
        <TableHead>
          <TableRow >
            <TableCell align="center">No</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Test;
