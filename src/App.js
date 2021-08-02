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
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer/Footer';

// import {  cyan, teal } from '@material-ui/core/colors';

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
            main: darktheme ? '#f57f17' : '#1976D2',
            dark: '#000000',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#311b92',
            dark: '#000000',
            contrastText: '#fff',
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
          <Paper elevation={0}>  
            <div className="App">
              <Header darktheme={darktheme} setdarkTheme={setdarkTheme} />
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

                <Route path="/search/:query">
                  <SearchPage />
                </Route>
                
              </Switch>
              <Footer/>
            </div>
          </Paper>
        </ThemeProvider>

      </AnimatePresence>

    </ApolloProvider>
  );
}

export default App
