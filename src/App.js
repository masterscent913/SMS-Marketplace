import { useRoutes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./locales/i18n";
import { SettingsConsumer, SettingsProvider } from "./contexts/settings";
import { createTheme } from "./theme";
import { AuthConsumer, AuthProvider } from "./contexts/auth/auth-context";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "./components/toaster";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useNprogress } from "./hooks/use-nprogress";
// Remove if react-quill is not used
import "react-quill/dist/quill.snow.css";
// Remove if react-draft-wysiwyg is not used
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Remove if simplebar is not used
import "simplebar-react/dist/simplebar.min.css";
// Remove if mapbox is not used
import "mapbox-gl/dist/mapbox-gl.css";
// Remove if locales are not used
import "./locales/i18n";

export const App = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => (
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    if (!settings.isInitialized) {
                      // return null;
                    }
                    const theme = createTheme({
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      direction: settings.direction,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes,
                    });

                    const showSplash = !auth.isInitialized;

                    return (
                      <ThemeProvider theme={theme}>
                        <Helmet>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          <meta
                            name="theme-color"
                            content={theme.palette.neutral[900]}
                          />
                        </Helmet>
                        <CssBaseline />
                        {element}
                        <Toaster />
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            )}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
