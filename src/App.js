import React, { useEffect, useState } from 'react';
import Footer from '../src/components/Footer/index';
import Main from '../src/components/Main/index';
import Header from '../src/components/Header/index';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from "@material-ui/core";
import { Provider } from 'react-redux';
import store from '../src/Store/index';
import { createMuiTheme } from "@material-ui/core";

function App() {

  const [prefersDarkMode, setTheme] = useState(store.getState().ReducersSwitchTheme.theme);

  useEffect(() =>{
  },[]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  store.subscribe(()=>{
    setTheme(store.getState().ReducersSwitchTheme.theme);
  });
  
  return (
    <div className="App">
      <Provider store={ store }>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Main />
            <Footer />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
