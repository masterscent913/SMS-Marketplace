import { addDays, subDays, subHours, subMinutes } from 'date-fns'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSettings } from 'src/hooks/use-settings'
import { OverviewDoneTasks } from 'src/sections/admin/overview/overview-done-tasks'
import { OverviewPendingIssues } from 'src/sections/admin/overview/overview-pending-issues'
import { OverviewSubscriptionUsage } from 'src/sections/admin/overview/overview-subscription-usage'
import { OverviewOpenTickets } from 'src/sections/admin/overview/overview-open-tickets'

const now = new Date()

const Page = () => {
  const settings = useSettings()

  usePageView()

  return (
    <>
      <Seo title='Dashboard: Overview' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>Overview</Typography>
                </div>
                {/* <div>
                  <Stack direction="row" spacing={4}>
                    <Button
                      startIcon={
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      New Dashboard
                    </Button>
                  </Stack>
                </div> */}
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewPendingIssues amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewDoneTasks amount={31} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewOpenTickets amount={5} />
            </Grid>
            <Grid xs={12} md={12}>
              <OverviewSubscriptionUsage
                chartSeries={[
                  {
                    name: 'This year',
                    data: [40, 37, 41, 42, 45, 42, 36, 45, 40, 44, 38, 41]
                  },
                  {
                    name: 'Last year',
                    data: [26, 22, 19, 22, 24, 28, 23, 25, 24, 21, 17, 19]
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Page
