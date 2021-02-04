/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { DropzoneArea } from 'material-ui-dropzone';
// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
// import Logo from '../files/DTlogo.png';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import API from '../services/API';
import Logo from '../files/DTlogo.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        DaddyTransfer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword(props) {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    const { token, userId } = props.match.params;
    e.preventDefault();
    try {
      await API.post('users/store-password', {
        newPassword,
        newPasswordConfirmation,
        token,
        userId,
      });
      addToast('Votre mot de passe a été modifié avec succès.', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
    } catch (err) {
      addToast('Erreur, veuillez refaire une demande.', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Logo} alt="logo DaddyTransfer" />
      </div>
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: '20px', textAlign: 'center' }}
        >
          Modifiez votre mot de passe
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="user_password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="user_confirmation_password"
            label="Confirmation du mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPasswordConfirmation}
            onChange={(event) => setNewPasswordConfirmation(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Envoyer
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
