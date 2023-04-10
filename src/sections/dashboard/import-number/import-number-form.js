import { useCallback, useEffect, useRef, useState } from "react";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import { numbersApi } from "src/api/numbers";
import { useAuth } from "src/hooks/use-auth";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Unstable_Grid2 as Grid,
  SvgIcon,
  Stack,
  Input,
  IconButton,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

export const ImportNumberForm = () => {
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const [numbers, setNumbers] = useState("");

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    let numArray = numbers.split(",");
    console.log('numArray >>>', numArray);
    if (user) {
      try {
        await numbersApi.submitNumber({id: user.id, numbers: numArray});
        toast.success('Import number done');
      } catch (error) {
        toast.error('Import number failed');
      }
    }
  }, [numbers]);

  // const fileInputRef = useRef(null);
  // const handleImport = useCallback(async () => {
  //   console.log("conasfas");
  //   await fileInputRef.current?.click();
  // }, []);

  // // useEffect(() => {
  // //   setFile(fileInputRef.current.files[0]);
  // // }, [fileInputRef.current]);

  // const handleFileInputChange = (e) => {
  //   console.log("conasfas");
  //   // setFile(fileInputRef.current.files[0]);
  //   setFile(e.target.files[0]);
  // };

  // const handleRemoveSelectedFile = () => {
  //   setFile(null);
  //   fileInputRef.current.files = null;
  // };

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleChangeNumber = (e) => {
    setNumbers(e.target.value);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const file = fileInputRef.current.files[0];
  //   if (file && file.type === "text/csv") {
  //     // TODO: Upload the file
  //     console.log("Uploading file:", file.name);
  //     setFileName(file.name);
  //   } else {
  //     console.log("Invalid file type");
  //   }
  // };

  const handleFileChange = (e) => {
    console.log("import click");
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async function (e) {
        const content = e.target.result;
        await formik.setFieldValue("numbers", content);
      }
      reader.readAsText(file);
    } else {
      setFileName("");
    }
  };

  const handleRemoveClick = () => {
    setFileName("");
    fileInputRef.current.value = null;
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <FormControl fullWidth>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              fullWidth
              spacing={1}
              sx={{ py: 2 }}
            >
              <FormLabel
                sx={{
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Import Numbers
              </FormLabel>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {fileName ? (
                <Stack align="content-center" direction="row">
                  <p>{fileName}</p>
                  <IconButton onClick={handleRemoveClick}>
                    <SvgIcon color="error" size="small">
                      <RemoveCircle />
                    </SvgIcon>
                  </IconButton>
                </Stack>
              ) : (
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleImportClick}
                  startIcon={
                    <SvgIcon>
                      <Upload01Icon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
              )}
            </Stack>
            <OutlinedInput
              fullWidth
              name="numbers"
              placeholder="Enter comma separated numbers"
              required
              value={numbers}
              onChange={handleChangeNumber}
              multiline
              rows={6}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button fullWidth size="large" type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};
