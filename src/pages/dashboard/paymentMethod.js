import RefreshCcw01Icon from "@untitled-ui/icons-react/build/esm/RefreshCcw01";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { CheckoutBilling } from "src/sections/dashboard/paymentMethod/payment-method";
import { useEffect, useCallback, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";



const initialBilling = {
  address: "",
  cardExpirationDate: "",
  cardNumber: "",
  cardOwner: "",
  cardSecurityCode: "",
  firstName: "",
  lastName: "",
  optionalAddress: "",
  paymentMethod: "visa",
  state: "",
  zip: "",
};

const initialBilling1 = {
  address: "1",
  cardExpirationDate: "",
  cardNumber: "",
  cardOwner: "",
  cardSecurityCode: "",
  firstName: "",
  lastName: "",
  optionalAddress: "",
  paymentMethod: "visa",
  state: "",
  zip: "",
};

const Page = () => {
  const settings = useSettings();
  const [billing, setBilling] = useState(initialBilling);

  usePageView();

  useEffect(() => {
    console.log("start");
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://65.21.236.218:2480/paymentquery',
          {
            userid:window.name,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        console.log("Start Billing====>", response.data[0]);
        if(response.data[0] !== undefined )
        {
          setBilling((prevState) => ({
            ...prevState,
            address : response.data[0].street,
            cardExpirationDate : response.data[0].cardExpirationDate,
            cardNumber: response.data[0].cardnumber,
            cardOwner: response.data[0].cardname,
            cardSecurityCode: response.data[0].securitycode,
            firstName: response.data[0].firstname,
            lastName: response.data[0].lastname,
            optionalAddress: response.data[0].street2,
            paymentMethod: response.data[0].cardtype,
            state: response.data[0].state,
            zip: response.data[0].zip,
          }));
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleBillingChange = useCallback((event) => {
    console.log("billing change", event.target.value);
    setBilling((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);
  return (
    <>
      <Seo title="Dashboard: Payment Method" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Payment Method</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <CheckoutBilling
                billing={billing}
                onChange={handleBillingChange}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
