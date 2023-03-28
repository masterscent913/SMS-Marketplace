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
import { MailList } from "src/sections/dashboard/mail/mail-list";

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: SMS History" />
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
              <MailList currentLabelId={"all"} onSidebarToggle={() => {}} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
