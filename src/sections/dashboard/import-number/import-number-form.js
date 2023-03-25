import { useCallback, useRef } from "react";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";

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
} from "@mui/material";

export const ImportNumberForm = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const fileInputRef = useRef(null);
  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
              <Button
                color="inherit"
                size="small"
                onClick={handleImport}
                startIcon={
                  <SvgIcon>
                    <Upload01Icon />
                  </SvgIcon>
                }
              >
                Import
              </Button>
              <input hidden ref={fileInputRef} type="file" />
            </Stack>

            <OutlinedInput
              fullWidth
              name="numbers"
              placeholder="Enter comma separated numbers"
              required
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
        <Button fullWidth size="large" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};
