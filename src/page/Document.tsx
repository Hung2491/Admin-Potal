import { useEffect } from "react";
import { UseAuth } from "../hook/AuthContext";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const styles = {
  container: {
    flex: 1,
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: 700,
    width: 1,
    paddingBlock: "30px",
  },
  uploadButton: {
    padding: "10px",
    marginBlock: "20px",
    backgroundColor: "#3168bd",
    fontWeight: 600,
    color: "white",
  },
  paper: {
    width: "100%",
  },
  tableHeaderCell: {
    fontSize: 16,
    fontWeight: 600,
  },
  tableSummaryCell: {
    fontSize: 16,
    fontWeight: 600,
  },
  tableCell: {
    fontSize: 16,
  },
  headerRow: {
    backgroundColor: "#dce5ee",
  },
};

export default function Document() {
  const { fetchDocument, documents } = UseAuth();

  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Document Managemant
      </Typography>
      <Button sx={styles.uploadButton}>+ Upload New Document</Button>
      <Paper elevation={10} sx={styles.paper}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow sx={styles.headerRow}>
                {["Document Name", "Type", "Date", "Status"].map((item) => (
                  <TableCell key={item} sx={styles.tableHeaderCell}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {documents!.map((data) => (
                <TableRow key={data._id}>
                  <TableCell sx={styles.tableSummaryCell}>
                    {data.summary}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>{data.labels}</TableCell>
                  <TableCell sx={styles.tableCell}>{data.updatedAt}</TableCell>
                  <TableCell sx={styles.tableCell}>{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
