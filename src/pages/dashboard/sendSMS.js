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
import { useCallback, useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useAuth } from "src/hooks/use-auth";
import { SERVER_URL } from "src/constants";
import { toast } from "react-hot-toast";
import CreditCardPayment from "./creditCardPayment";

const validationSchema = Yup.object({
  message: Yup.string().max(5000)
});

const Page = () => {
  const [mobileNumbers, setMobileNumbers] = useState([]);
  const settings = useSettings();
  const { user } = useAuth();

  const handleProcessResult = (result) => {
    setOpenCardPayment(false);
  }

  const handlePaymentClose = () => {
    setOpenCardPayment(false);
  }

  const [openCardPayment, setOpenCardPayment] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: "",
      scheduleDate: new Date(),
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      if (mobileNumbers.length == 0) {
        toast.info('No mobile number to send sms');
        return;
      }
      console.log('Date.now()', Date.now());
      console.log('values.scheduleDate.getTime()', values.scheduleDate.getTime());
      if ((values.scheduleDate.getTime() - Date.now()) < 0 ) {
        toast.error('Invalid date');
      } else {
        setOpenCardPayment(true);
      }
      //console.log('values >>>', values);
    },
  });

  const setPaymentCompleted = async (result) => {
    if (result) {
      console.log('>>> payment success >>> ');
      let numbers = [];
      mobileNumbers.forEach((mobile) => {
        numbers.push(mobile.number);
      });
      try {
        const response = await axios.post(
          `${SERVER_URL}/schedulesms`,
          {
            userid: user.id,
            numbers: numbers.join(','),
            senddate: formik.values.scheduleDate.getTime() / 1000,
            content: formik.values.message
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('response >>>', response);
        if (response.status === 200) {
          // const mobileNumbers = response.data.result;
          // setMobileNumbers(mobileNumbers);
          // console.log('mobileNumberCount >>>', mobileNumberCount);
          toast.success('Send sms scheduled');
        } else {
          
        }
      } catch (err) {
        toast.success('SMS schedule failed');
      }
    } else {
      console.log('>>> payment failed >>> ');
      toast.error('Payment failed');
    }
    setOpenCardPayment(false);
  }


  const handleScheduleDateChange = useCallback(
    (date) => {
      formik.setFieldValue("scheduleDate", date);
    },
    [formik]
  );

  useEffect(() => {

    const getMobileNumbersCount = async () => {
      console.log('getMobileNumbersCount start');
      try {
        const response = await axios.post(
          `${SERVER_URL}/getMobileNumbers`,
          {
            userid: user.id
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('response >>>', response);
        if (response.status === 200) {
          const mobileNumbers = response.data.result;
          setMobileNumbers(mobileNumbers);
          // console.log('mobileNumberCount >>>', mobileNumberCount);
        } else {
          
        }
      } catch (err) {
      }
    }

    getMobileNumbersCount();
  }, []);

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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.message && formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    value={formik.values.message}
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
                  <Typography variant="h6">{mobileNumbers.length}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    numbers &nbsp;
                  </Typography>
                  <Typography variant="h6">X</Typography>

                  <Typography variant="h6">${user.setting.sms_cost}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="text.secondary" variant="body2">
                    Total
                  </Typography>
                  <Typography variant="h6">${mobileNumbers.length * user.setting.sms_cost}</Typography>
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
                    type="submit"
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
      <CreditCardPayment
          amount={mobileNumbers.length * user.setting.sms_cost}
          processResult={handleProcessResult}
          openPayment={openCardPayment}
          setPaymentCompleted={setPaymentCompleted}
          paymentDescription={`You have to pay ${mobileNumbers.length} * $${user.setting.sms_cost} = $${mobileNumbers.length*user.setting.sms_cost} to send sms. Make sure you have added payment method.`}
          payButtonText={"Pay and Proceed"}
          dialogTitle={"Send SMS"}
          onClose={handlePaymentClose} />
    </>
  );
};

export default Page;
