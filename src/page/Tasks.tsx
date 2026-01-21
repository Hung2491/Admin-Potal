import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  // MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { COLORS } from "../styles/Corlor";
import PopUp from "../component/PopUp";
import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UseTask } from "../hook/TaskContext";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  TaskType,
  type AddTask,
  type UpdateTask,
} from "../types/TaskManagement";
import { UseDocument } from "../hook/DocumentContext";

export default function Tasks() {
  const {
    tasks,
    addTask,
    users,
    fetchUsers,
    fetchTask,
    updateTask,
    detailTask,
    taskDetail,
    loading,
    deleteTask,
    alert,
  } = UseTask();
  const { documentsList, fetchDocument } = UseDocument();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNew, setNew] = useState<boolean>(false);
  const [openEdit, setEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchDocument();
    console.log("get task useEffect");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTask(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);
  useEffect(() => {
    if (!taskDetail) return;

    setFormEdit({
      title: taskDetail.title ?? "",
      description: taskDetail.description ?? "",
      reporter: {
        type: taskDetail.reporter?.type ?? "agents",
        id: taskDetail.reporter?.id ?? "",
      },
      dueDate: taskDetail.dueDate ?? "",
      startAt: taskDetail.startAt ?? "",
      documents: taskDetail.documents?.map((d) => d) ?? [],
    });
  }, [taskDetail]);

  const [form, setForm] = useState<AddTask>({
    title: "",
    description: "",
    type: "task",
    reporter: {
      type: "agents",
      id: "",
    },
    dueDate: Date.now().toString(),
    startAt: Date.now().toString(),
    documents: [],
  });

  const [formEdit, setFormEdit] = useState<UpdateTask>({
    title: "",
    description: "",
    reporter: {
      type: "agents",
      id: "",
    },
    dueDate: "",
    startAt: "",
    documents: [],
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
  const formatDate = (value: string) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const toggleDocument = (id: string) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.includes(id)
        ? prev.documents.filter((x) => x !== id)
        : [...prev.documents, id],
    }));
  };

  const toggleDocumentEdit = (id: string) => {
    setFormEdit((prev) => ({
      ...prev,
      documents: prev.documents.includes(id)
        ? prev.documents.filter((x) => x !== id)
        : [...prev.documents, id],
    }));
  };

  const createTask = async () => {
    const success = await addTask(form);
    if (success) {
      console.log("Create task successfully");
      setNew(false);
    } else {
      console.log("Failed to create task");
    }
  };
  const Update = async (id: string) => {
    const success = await updateTask(id, formEdit);
    if (success) {
      console.log("Update task successfully");
      setNew(false);
    } else {
      console.log("Failed to update task");
    }
  };

  const columns = ["Task Name", "Type", "Due Date", "Status", "Edit", ""];
  return (
    <Box
      sx={{
        flex: 1,
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h3"
        sx={{ width: 1, textAlign: "left", fontWeight: 700 }}
      >
        Task Management
      </Typography>
      <Box sx={{ width: 1, display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{
            padding: "10px",
            marginBlock: "20px",
            backgroundColor: COLORS.primary,
            fontWeight: 600,
            color: "white",
          }}
          onClick={() => {
            setNew(true);
            fetchUsers();
          }}
        >
          + New Task
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
      <PopUp
        title="New Task"
        open={openNew}
        onClose={() => setNew(false)}
        onConfirm={createTask}
        showClose={true}
      >
        <Input
          title="Task Name"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        ></Input>
        <Input
          title="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></Input>

        <Box height={15}></Box>
        <Input
          value={form.reporter?.type}
          title="Type"
          select
          onChange={(e) =>
            setForm({
              ...form,
              reporter: { ...form.reporter, type: e.target.value },
            })
          }
        >
          {Object.values(TaskType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Input>
        {form.reporter?.type === TaskType.USERS && (
          <FormControl>
            <RadioGroup
              value={form.reporter.id ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  reporter: {
                    ...form.reporter,
                    id: e.target.value,
                  },
                })
              }
            >
              {users.map((user) => (
                <FormControlLabel
                  key={user._id}
                  value={String(user._id)} // 👈 ÉP STRING CHO CHẮC
                  control={<Radio />}
                  label={user.username}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        <Box height={15}></Box>
        <FormControl component="fieldset">
          <FormLabel>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "black" }}
            >
              Documents
            </Typography>
          </FormLabel>
          <FormGroup>
            {documentsList.map((doc) => (
              <FormControlLabel
                key={doc._id}
                label={doc.summary}
                control={
                  <Checkbox
                    checked={form.documents.includes(doc._id!)}
                    onChange={() => toggleDocument(doc._id!)}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </PopUp>
      <PopUp
        title="Edit Task"
        open={openEdit}
        onClose={() => setEdit(false)}
        onConfirm={() => {
          Update(id);
          setEdit(false);
        }}
        showClose={true}
      >
        <Input
          title="Task Name"
          value={formEdit.title}
          onChange={(e) => setFormEdit({ ...formEdit, title: e.target.value })}
        ></Input>
        <Input
          title="Description"
          value={formEdit.description}
          onChange={(e) =>
            setFormEdit({
              ...formEdit,
              description: e.target.value,
            })
          }
        ></Input>

        <Box height={15}></Box>
        <Input
          value={formEdit.reporter?.type}
          title="Type"
          select
          onChange={(e) =>
            setFormEdit({
              ...formEdit,
              reporter: {
                ...formEdit.reporter,
                type: e.target.value,
              },
            })
          }
        >
          {Object.values(TaskType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Input>
        {formEdit.reporter?.type === TaskType.USERS && (
          <FormControl>
            <RadioGroup
              value={formEdit.reporter.id ?? ""}
              onChange={(e) =>
                setFormEdit({
                  ...formEdit,
                  reporter: {
                    ...formEdit.reporter,
                    id: e.target.value,
                  },
                })
              }
            >
              {users.map((user) => (
                <FormControlLabel
                  key={user._id}
                  value={String(user._id)}
                  control={<Radio />}
                  label={user.username}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        <Box height={15}></Box>
        <FormControl component="fieldset">
          <FormLabel>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "black" }}
            >
              Documents
            </Typography>
          </FormLabel>
          <FormGroup>
            {documentsList.map((doc) => (
              <FormControlLabel
                key={doc._id}
                label={doc.summary}
                control={
                  <Checkbox
                    checked={formEdit.documents.includes(doc._id!)}
                    onChange={() => toggleDocumentEdit(doc._id!)}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </PopUp>
      <PopUp
        title="Xác nhận xóa"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          alert('Xóa dữ liệu không thành công')
          deleteTask(id);
          setOpenDelete(false);
        }}
        showClose={true}
      >
        <Typography> Bạn có chắc chắn muốn xoá nục này </Typography>
      </PopUp>
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
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                tasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow tabIndex={-1} key={data._id}>
                      <TableCell sx={styles.tableSummaryCell}>
                        {data.title}
                      </TableCell>

                      <TableCell sx={styles.tableCell}>{data.type}</TableCell>

                      <TableCell sx={styles.tableCell}>
                        {formatDate(data.dueDate!)}
                      </TableCell>

                      <TableCell sx={styles.tableCell}>{data.status}</TableCell>

                      <TableCell
                        onClick={() => {
                          fetchUsers();
                          detailTask(data._id!);
                          setId(data._id!);
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
                        onClick={() => {
                          setId(data._id!);
                          setOpenDelete(true);
                        }}
                        sx={[
                          styles.tableCell,
                          { color: COLORS.primary, fontWeight: "bold" },
                        ]}
                      >
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={tasks!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

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
