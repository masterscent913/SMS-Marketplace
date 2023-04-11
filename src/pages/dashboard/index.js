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
import { OverviewSMSMonth } from 'src/sections/dashboard/overview/overview-sms-month'
import { OverviewSMSWeek } from 'src/sections/dashboard/overview/overview-sms-week'
import { OverviewSMSAnalytics } from 'src/sections/dashboard/overview/overview-sms-analytics'
import { OverviewSMSYear } from 'src/sections/dashboard/overview/overview-sms-year'
import { useAuth } from 'src/hooks/use-auth'
import { smsApi } from 'src/api/sms'
import { useEffect, useState } from 'react'

const now = new Date()

const Page = () => {
  const settings = useSettings()
  const { user } = useAuth();
  const [weekCount, setWeekCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [yearCount, setYearCount] = useState(0);
  const [chartSeries, setChartSeries] = useState([
    {
      name: 'SMS',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]);

  usePageView()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await smsApi.getSMSAnalytics(user.id);
        if (data != null) {
          setWeekCount(data.week);
          setMonthCount(data.month);
          setYearCount(data.year);
          let chartdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          data.analytics.forEach((analytic) => {
            chartdata[analytic.month] = analytic.count;
          });
          let seriesData = [
            {
              name: 'SMS',
              data: chartdata
            }
          ];
          console.log('data.analytics >>>', data.analytics);
          console.log('seriesData >>>', seriesData);

          setChartSeries(seriesData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

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
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewSMSWeek amount={weekCount} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewSMSMonth amount={monthCount} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewSMSYear amount={yearCount} />
            </Grid>
            <Grid xs={12} md={12}>
              <OverviewSMSAnalytics
                chartSeries={chartSeries}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Page
