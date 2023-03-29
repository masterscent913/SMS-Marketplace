import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { clientsApi } from "src/api/clients";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { ClientEditForm } from "src/sections/admin/client/client-edit-form";
import { getInitials } from "src/utils/get-initials";
import { ClientCreateForm } from "src/sections/admin/client/client-create-form";

const useClient = () => {
  const isMounted = useMounted();
  const [client, setClient] = useState(null);

  const handleClientGet = useCallback(async () => {
    try {
      const response = await clientsApi.getClient();

      if (isMounted()) {
        setClient(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleClientGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return client;
};

const Page = () => {
  const client = useClient();

  usePageView();

  if (!client) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Client Create" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.admin.clients.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Clients</Typography>
                </Link>
              </div>
            </Stack>
            <ClientCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
