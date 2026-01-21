import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github.css";
import {
  Box,
  Button,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PopUp from "../component/PopUp";
import Input from "../component/Input";
import { DocumentType, type AddDocument } from "../types/DocumentType";
import { COLORS } from "../styles/Corlor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseDocument } from "../hook/DocumentContext";
export default function Document() {
  const {
    documentsList,
    detailDocument,
    detailDocuments,
    contentDocument,
    contentDocuments,
    addDocument,
    deleteDocument,
    updateDocument,
    fetchDocument,
    loading,
  } = UseDocument();
  const [openDetail, setDetail] = useState<boolean>(false);
  const [openNew, setNew] = useState<boolean>(false);
  const [openEdit, setEdit] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [id, setId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string) => {
    handleClose();
    Delete(id);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDocument(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    if (!detailDocuments) return;

    setFormEdit({
      summary: detailDocuments.summary ?? "",
      type: detailDocuments.type ?? "",
      labels: detailDocuments.labels ?? [],
      content: contentDocuments ?? "",
    });
  }, [detailDocuments]);

  const [form, setForm] = useState<AddDocument>({
    summary: "",
    type: "markdown",
    labels: [],
    content: "",
  });

  const [formEdit, setFormEdit] = useState<AddDocument>({
    summary: "",
    type: "",
    labels: [],
    content: "",
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };

  const createDocument = async () => {
    const success = await addDocument(form);
    if (success) {
      console.log("Create document successfully");
      setNew(false);
    } else {
      console.log("Failed to create document");
    }
  };
  const Update = async (id: string) => {
    const success = await updateDocument(id, formEdit);
    if (success) {
      console.log("Update document successfully");
      setNew(false);
    } else {
      console.log("Failed to update document");
    }
  };

  const Delete = async (id: string) => {
    const success = await deleteDocument(id);
    if (success) {
      console.log("Delete document successfully");
    } else {
      console.log("Failed to delete document");
    }
  };
  const formatDate = (value: string) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={styles.container}>
      <PopUp
        title="Document Detail"
        open={openDetail}
        onClose={() => setDetail(false)}
        onConfirm={() => {
          setDetail(false);
        }}
      >
        <Typography sx={styles.detailLabel}>
          Document Name:
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.summary}
          </Typography>
        </Typography>
        <Box component="pre" sx={styles.codeBox}>
          {"text" === detailDocuments?.type && (
            <Typography>{contentDocuments}</Typography>
          )}
          {"markdown" === detailDocuments?.type && (
            <ReactMarkdown>{`${contentDocuments}`}</ReactMarkdown>
          )}
          {"html" === detailDocuments?.type && (
            <div
              dangerouslySetInnerHTML={{
                __html: `${contentDocuments}`,
              }}
            />
          )}
          {"json" === detailDocuments?.type && (
            <pre>{JSON.stringify({ contentDocuments }, null, 2)}</pre>
          )}
        </Box>
        <Typography sx={styles.detailMarginTop}>
          Type:{" "}
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.type}
          </Typography>
        </Typography>
        <Typography sx={styles.detailMarginTop}>
          CreatedAt:{" "}
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.createdAt}
          </Typography>
        </Typography>
        <Typography sx={styles.detailMarginTop}>
          Labels:{" "}
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.labels}
          </Typography>
        </Typography>
        <Typography sx={styles.detailMarginTop}>
          Status:{" "}
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.status}
          </Typography>
        </Typography>
        <Typography sx={styles.detailMarginTop}>
          UpdatedAt:{" "}
          <Typography sx={styles.detailValue} component="span">
            {detailDocuments?.updatedAt}
          </Typography>
        </Typography>
      </PopUp>
      <PopUp
        title="New DocCument"
        open={openNew}
        onClose={() => setNew(false)}
        onConfirm={createDocument}
        showClose={true}
      >
        <Input
          title="Document Name"
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        ></Input>
        <Input
          title="Labels"
          onChange={(e) => setForm({ ...form, labels: e.target.value })}
        ></Input>
        <Input
          title="Content"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          multiline
          minRows={3}
          maxRows={8}
        ></Input>
        <Box height={15}></Box>
        <Input
          value={form.type}
          title="Type"
          select
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {Object.values(DocumentType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Input>
      </PopUp>
      <PopUp
        title="Edit Document"
        open={openEdit}
        onClose={() => setEdit(false)}
        onConfirm={() => {
          console.log(id);
          Update(id);
          setEdit(false);
        }}
        showClose={true}
      >
        <Input
          title="Document Name"
          value={formEdit.summary}
          onChange={(e) =>
            setFormEdit({ ...formEdit, summary: e.target.value })
          }
        ></Input>
        <Input
          title="Labels"
          value={formEdit.labels}
          onChange={(e) => setFormEdit({ ...formEdit, labels: e.target.value })}
        ></Input>
        <Input
          title="Content"
          multiline
          minRows={3}
          maxRows={8}
          value={formEdit.content}
          onChange={(e) =>
            setFormEdit({ ...formEdit, content: e.target.value })
          }
        ></Input>
        <Box height={15}></Box>
        <Input
          value={formEdit.type}
          title="Type"
          select
          onChange={(e) => setFormEdit({ ...formEdit, type: e.target.value })}
        >
          {Object.values(DocumentType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Input>
      </PopUp>
      <Typography variant="h4" sx={styles.title}>
        Document Management
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
        <Button
          sx={styles.uploadButton}
          onClick={() => {
            setNew(true);
          }}
        >
          + Upload New Document
        </Button>
        <Box width={"20%"}>
          {" "}
          <Input
            placehoder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          ></Input>
        </Box>
      </Box>
      <Paper elevation={10} sx={styles.paper}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow sx={styles.headerRow}>
                {columns.map((item) => (
                  <TableCell key={item} sx={styles.tableHeaderCell}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : documentsList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                documentsList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow tabIndex={-1} key={data._id}>
                      <TableCell sx={styles.tableSummaryCell}>
                        {data.summary}
                      </TableCell>
                      <TableCell sx={styles.tableCell}>{data.labels}</TableCell>
                      <TableCell sx={styles.tableCell}>{data.type}</TableCell>
                      <TableCell sx={styles.tableCell}>
                        {formatDate(data.updatedAt!)}
                      </TableCell>
                      <TableCell sx={styles.tableCell}>{data.status}</TableCell>

                      <TableCell
                        onClick={() => {
                          detailDocument(data._id!);
                          contentDocument(data._id!);
                          setDetail(true);
                        }}
                        sx={[
                          styles.tableCell,
                          { color: COLORS.primary, fontWeight: "bold" },
                        ]}
                      >
                        Detail
                      </TableCell>

                      <TableCell
                        onClick={() => {
                          setId(data._id!);
                          detailDocument(data._id!);
                          contentDocument(data._id!);
                          setEdit(true);
                        }}
                        sx={[
                          styles.tableCell,
                          { color: "gray", fontWeight: "bold" },
                        ]}
                      >
                        <EditIcon />
                      </TableCell>

                      <TableCell
                        onClick={() => handleOpen}
                        sx={[
                          styles.tableCell,
                          { color: COLORS.primary, fontWeight: "bold" },
                        ]}
                      >
                        <DeleteIcon />
                      </TableCell>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <CloseIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Hủy</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDelete(data._id!)}
                          sx={{ color: "error.main" }}
                        >
                          <ListItemIcon sx={{ color: "error.main" }}>
                            <DeleteOutlineIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Xóa</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={documentsList!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
const columns = [
  "Document Name",
  "Labels",
  "Type",
  "Date",
  "Status",
  "Detail",
  "Edit",
  "",
];

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
  codeBox: {
    fontFamily: `"JetBrains Mono", monospace`,
    background: "#161b22",
    color: "#c9d1d9",
    padding: 2,
    borderRadius: 1,
    fontSize: "13px",
    lineHeight: 1.6,
    whiteSpace: "pre",
    overflow: "auto",
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
  detailLabel: {
    display: "flex",
    fontWeight: 600,
  },
  detailValue: {
    display: "flex",
    marginLeft: 5,
  },
  detailMarginTop: {
    display: "flex",
    fontWeight: 600,
    marginTop: 5,
  },
};
