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
import { useCallback, useState } from "react";
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

const Page = () => {
  const settings = useSettings();
  

  usePageView();

   // . . .
  const response = axios.post(
    'http://65.21.236.218:2480/paymentquery',
    {
      userid:window.name,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(function(response){
    console.log("data", response.data);
    //setBilling(response.data);
    //setBilling((prevState) => (response.data));
    let initialBilling = response.data;
  }
  ).catch(function(error){
    console.log(error);
  });

  const [billing, setBilling] = useState(initialBilling);

  const handleBillingChange = useCallback((event) => {
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
