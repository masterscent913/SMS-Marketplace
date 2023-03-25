import RefreshCcw01Icon from "@untitled-ui/icons-react/build/esm/RefreshCcw01";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  TextField,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Seo } from "src/components/seo";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { useCallback, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";

const validationSchema = Yup.object({
  message: Yup.string().max(5000),
  scheduleDate: Yup.date(),
});

const Page = () => {
  const settings = useSettings();

  const formik = useFormik({
    initialValues: {
      message: "",
      scheduleDate: Date.now(),
    },
    validationSchema,
    onSubmit: async (values, helpers) => {},
  });

  const handleScheduleDateChange = useCallback(
    (date) => {
      formik.setFieldValue("scheduleDate", date);
    },
    [formik]
  );
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Send SMS" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <div>
                    <Typography variant="h4">Send SMS</Typography>
                  </div>
                </Stack>
              </Grid>

              <Grid xs={12} lg={8}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: "text.primary",
                      mb: 1,
                    }}
                  >
                    Message
                  </FormLabel>
                  <OutlinedInput
                    fullWidth
                    name="message"
                    placeholder="Enter message"
                    required
                    multiline
                    rows={6}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} lg={8}>
                <FormControl sx={{ pb: 5 }} fullWidth>
                  <FormLabel
                    sx={{
                      color: "text.primary",
                      mb: 1,
                    }}
                  >
                    Schedule Date
                  </FormLabel>
                  <DateTimePicker
                    label="Schedule date"
                    onChange={handleScheduleDateChange}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={formik.values.scheduleDate}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} lg={8} spacing={2}>
                <Typography variant="h5" color="text.secondary">
                  SMS cost
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h6">4516</Typography>
                  <Typography color="text.secondary" variant="body2">
                    numbers &nbsp;
                  </Typography>
                  <Typography variant="h6">X</Typography>

                  <Typography variant="h6">$0.08</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="text.secondary" variant="body2">
                    Total
                  </Typography>
                  <Typography variant="h6">$350.00</Typography>
                </Box>
              </Grid>
              <Grid xs={12} lg={8} spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  <Button
                    size="large"
                    fullWidth
                    sx={{ minWidth: "200px" }}
                    variant="contained"
                  >
                    Send
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
