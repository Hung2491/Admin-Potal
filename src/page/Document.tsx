import { useEffect, useState } from "react";
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
import PopUp from "../component/PopUp";

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
  const { fetchDocument, documents, detailDocument, detailDocuments } =
    UseAuth();
  const [open, setOpen] = useState<boolean>(false);

  const formatDate = (value: string) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  console.log("log");

  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <Box sx={styles.container}>
      <PopUp
        title="Document Detail"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("Confirmed");
          setOpen(false);
        }}
      >
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          Document Name:
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.summary}
          </Typography>
        </Typography>
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          Type:{" "}
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.type}
          </Typography>
        </Typography>
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          CreatedAt:{" "}
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.createdAt}
          </Typography>
        </Typography>
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          Labels:{" "}
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.labels}
          </Typography>
        </Typography>
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          Status:{" "}
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.status}
          </Typography>
        </Typography>
        <Typography style={{ display: "flex", fontWeight: 600 }}>
          UpdatedAt:{" "}
          <Typography style={{ display: "flex", marginLeft: 5 }}>
            {detailDocuments?.updatedAt}
          </Typography>
        </Typography>
      </PopUp>
      <Typography variant="h4" sx={styles.title}>
        Document Managemant
      </Typography>
      <Button sx={styles.uploadButton} onClick={() => setOpen(true)}>
        + Upload New Document
      </Button>
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
                <TableRow
                  key={data._id}
                  onClick={async () => {
                    await detailDocument(data._id!);
                    setOpen(true);
                  }}
                >
                  <TableCell sx={styles.tableSummaryCell}>
                    {data.summary}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>{data.labels}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    {formatDate(data.updatedAt!)}
                  </TableCell>
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
