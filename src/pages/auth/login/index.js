import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import LoginIcon from '@mui/icons-material/Login';

const initialValues = {
  email: '',
  password: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup
    .string()
    .max(255)
    .required('Password is required')
});

const Page = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => { }
  });

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader
            // subheader={(
            //   <Typography
            //     color="text.secondary"
            //     variant="body2"
            //   >
            //     Don&apos;t have an account?
            //     &nbsp;
            //     <Link
            //       href={paths.auth.register}
            //       underline="hover"
            //       variant="subtitle2"
            //     >
            //       Register
            //     </Link>
            //   </Typography>
            // )}
            titleTypographyProps={{variant: 'h3'}}
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3
                }}
              >
                {/* <Link
                  href={paths.auth.forgotPassword}
                  underline="hover"
                  variant="subtitle2"
                >
                  Forgot password?
                </Link> */}
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
