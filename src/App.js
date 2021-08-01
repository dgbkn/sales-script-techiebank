import { Route, Switch } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { AnimatePresence } from "framer-motion";

// page & layout imports
import Homepage from './pages/Homepage'
import ItemDetails from './pages/ItemDetails'
import Category from './pages/Category'
import SiteHeader from "./components/SiteHeader"
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { CssBaseline, Paper } from '@material-ui/core';
import { useState } from 'react';
import Header from './components/Header';
import { useMemo } from 'react';
import {  cyan, teal } from '@material-ui/core/colors';
// apollo client
const client = new ApolloClient({
  uri: 'https://strapi-demo.shreeram4.repl.co/graphql',
  cache: new InMemoryCache()
});


// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


function App() {
  var [darktheme, setdarkTheme] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: darktheme ? 'dark' : 'light',
          primary: {
            light: '#757ce8',
            main: darktheme ? '#3f50b5' : '#1976D2',
            dark: '#000000',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
          
        },
      }),
    [darktheme],
  );


  return (
    <ApolloProvider client={client}>

      <AnimatePresence exitBeforeEnter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Paper>
            <div className="App">
              <Header darktheme={darktheme} setdarkTheme={setdarkTheme} />
              <SiteHeader />
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route path="/details/:id">
                  <ItemDetails />
                </Route>
                <Route path="/category/:id">
                  <Category />
                </Route>
              </Switch>
            </div>
          </Paper>
        </ThemeProvider>

      </AnimatePresence>

    </ApolloProvider>
  );
}

export default App
