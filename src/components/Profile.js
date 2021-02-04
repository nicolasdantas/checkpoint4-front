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
import Paper from '@material-ui/core/Paper';
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
  root: {
    flexGrow: 1,
  },
  paper1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom: '20px',
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

  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (userLogged) {
      setEmail(userLogged.user_email);
      setLastname(userLogged.user_lastname);
      setFirstname(userLogged.user_firstname);
      setAvatar(userLogged.user_image);
    }
  }, [userLogged]);

  const classes = useStyles();
  const { addToast } = useToasts();
  const [modificationMode, setModificationMode] = useState(false);

  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_firstname', firstname);
    formData.append('user_lastname', lastname);
    formData.append('user_email', email);
    formData.append('file', file[0]);
    formData.append('file_expire', '');
    try {
      await API.put(`users/${userLogged.user_id}`, formData).then(() =>
        API.get('/me').then((res) => setUserLogged(res.data))
      );
      addToast('Votre profil a bien été modifié', {
        appearance: 'success',
        autoDismiss: true,
      });
      setModificationMode(false);
    } catch (err) {
      addToast(
        'Erreur durant la modification de votre profile, veuillez rééssayer',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingLeft: '65px' }}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Logo} alt="logo DaddyTransfer" />
      </div>
      <div className={classes.paper1}>
        <Typography
          component="h1"
          variant="h2"
          style={{
            marginBottom: '20px',
            fontFamily: 'Teko, sans-serif',
            textAlign: 'center',
          }}
        >
          Mes informations personnelles
        </Typography>
        {modificationMode ? (
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <DropzoneArea
              onChange={(files) => setFile(files)}
              filesLimit={1}
              dropzoneText="Déposez un nouvel avatar ici ou cliquez pour parcourir"
            />
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enregistrer
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                marginBottom: '20px',
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
                src={`${process.env.REACT_APP_API_BASE_URL}/${avatar}`}
                alt={lastname}
              />
            </div>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>Prénom : {firstname}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>Nom : {lastname}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>Email : {email}</Paper>
            </Grid>
            <Button
              onClick={() => setModificationMode(!modificationMode)}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Modifier
            </Button>
          </>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
