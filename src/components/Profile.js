/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
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
import API from '../services/API';
import Logo from '../files/DTlogo.png';
import { LoginContext } from './Contexts/LoginContext';

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

export default function UploadPage() {
  const { userLogged, setUserLogged } = useContext(LoginContext);

  const classes = useStyles();
  const { addToast } = useToasts();
  const [email, setEmail] = useState(userLogged.user_email);
  const [lastname, setLastname] = useState(userLogged.user_lastname);
  const [firstname, setFirstname] = useState(userLogged.user_firstname);
  const [file, setFile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_firstname', firstname);
    formData.append('user_lastname', lastname);
    formData.append('user_email', email);
    // formData.append('file', file[0]);
    // formData.append('file_expire', '');
    try {
      await API.put(`users/${userLogged.user_id}`, formData).then(() =>
        API.get('/me').then((res) => setUserLogged(res.data))
      );
      addToast('Fichier envoyé !', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Erreur durant l'envoi du fichier", {
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
          style={{ marginBottom: '20px' }}
        >
          Mes informations personnelles
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}
          >
            <img
              style={{
                width: '40%',
                clipPath: 'circle()',
                margin: 'auto',
                marginTop: 0,
                marginBottom: 0,
              }}
              src={`${process.env.REACT_APP_API_BASE_URL}/${userLogged.user_image}`}
              alt={userLogged.user_lastname}
            />
          </div>
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* <DropzoneArea
            onChange={(files) => setFile(files)}
            filesLimit={1}
            dropzoneText="Déposez un fichier ici ou cliquez pour parcourir"
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Prénom "
            name="préom"
            autoComplete="prénom"
            autoFocus
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Nom"
            name="nom"
            autoComplete="nom"
            autoFocus
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Envoyer !
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
