import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material'
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './containers/Navbar';

const Home = lazy(() => import('./pages/Home'));

const SpecificBook = lazy(() => import('./pages/SpecificBook'));
const AddNewBook = lazy(() => import('./pages/AddNewBook'));
const EditBook = lazy(() => import('./pages/EditBook'));

const SpecificAuthor = lazy(() => import('./pages/SpecificAuthor'));
const AddNewAuthor = lazy(() => import('./pages/AddNewAuthor'));
const EditAuthor = lazy(() => import('./pages/EditAuthor'));




const theme = createTheme({
    palette: {
        primary: {
            light: '#a589d4',
            main: '#7e57c2',
            dark: '#583d88'
        },
        secondary: {
            light: '#a1aadb',
            main: '#7986cb',
            dark: '#555e8e'
        },
    },
});

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {/* Home Route */}
                            <Route exact path="/" component={Home} />
                            
                            {/* Author Routes */}
                            <Route exact path="/authors/add_new_author" component={AddNewAuthor} />
                            <Route exact path="/authors/:id" component={SpecificAuthor} />
                            <Route exact path='/authors/:id/edit' component={EditAuthor}/>

                            {/* Book Routes */}
                            <Route exact path="/books/add_new_book" component={AddNewBook} />
                            <Route exact path="/books/:id" component={SpecificBook} />
                            <Route exact path='/books/:id/edit' component={EditBook}/>
                        </Switch>
                    </Suspense>
                </Router>
            </ThemeProvider>
        </Provider>
    )
}

export default App;
