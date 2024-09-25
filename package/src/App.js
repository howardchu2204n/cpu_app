import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import VSAchieveReducer from "./reducer/VSAchieveReducer"
import { Provider } from 'react-redux';
import store from './store/index'; // Import your Redux store

const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
