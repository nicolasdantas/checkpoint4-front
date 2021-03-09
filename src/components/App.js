import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import Signin from './SignIn';
import Signup from './SignUp';
import UploadPage from './UploadPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import MyFiles from './MyFiles';
import MiniDrawer from './Menu';
import Profile from './Profile';
import LoginProvider from './Contexts/LoginContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4bd16f',
    },
    secondary: {
      main: '#21333b',
    },
  },
});

function App() {
  return (
    <LoginProvider>
      <ToastProvider placement="top-right">
        <ThemeProvider theme={theme}>
          <Router>
            <MiniDrawer />
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/upload" component={UploadPage} />
              <Route exact path="/my-files" component={MyFiles} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route
                exact
                path="/reset/:userId/:token"
                component={ResetPassword}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </ToastProvider>
    </LoginProvider>
  );
}

export default App;
