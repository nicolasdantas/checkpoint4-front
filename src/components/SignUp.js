/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { DropzoneArea } from 'material-ui-dropzone';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
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

export default function ForgotPassword() {
  const history = useHistory();
  const classes = useStyles();
  const { addToast } = useToasts();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userDatas, setUserDatas] = useState([]);

  let formData = [];

  const createMultipartForm = () => {
    formData = new FormData();
    formData.append('email', email);
    formData.append('user_firstname', firstname);
    formData.append('user_lastname', lastname);
    formData.append('user_email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('file', avatar[0]);
  };

  const confirmPassword = () => {
    if (password !== passwordConfirmation) {
      addToast('Le mot de passe et sa confirmation sont différents', {
        appearance: 'error',
        autoDismiss: true,
      });
      return false;
    }
    return true;
  };

  const handleSubscriptionError = (err) => {
    if (err.response.status === 500) {
      addToast(
        'Erreur lors de votre inscription, veuillez rééssayer plus tard',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    } else
      err.response.data.errorsByField[0].message.map((things) => {
        return addToast(things, {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword()) {
      createMultipartForm();
      try {
        await API.post('users', formData);
        addToast('Compte créé avec succès.', {
          appearance: 'success',
          autoDismiss: true,
        });
        e.target.reset();
        history.push('/');
      } catch (err) {
        handleSubscriptionError(err);
      }
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
          variant="h4"
          style={{
            marginBottom: '20px',
            textAlign: 'center',
            fontFamily: 'Teko, sans-serif',
          }}
        >
          Inscrivez-vous
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
            id="firstname"
            label="Saisissez votre prénom"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            onChange={(event) => setFirstname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Saisissez votre nom"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            onChange={(event) => setLastname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Saisissez votre email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Saisissez un mot de passe"
            name="password"
            autoComplete="password"
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password-confirmation"
            label="Confirmez votre mot de passe"
            name="password-confirmation"
            autoComplete="password-confirmation"
            autoFocus
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <DropzoneArea
            maxFileSize={1048576000}
            onChange={(files) => setAvatar(files)}
            filesLimit={1}
            dropzoneText="Ajouter un avatar (facultatif)"
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
