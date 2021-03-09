import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Logo from '../files/DTlogo.png';
import API from '../services/API';

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
  image: {
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const { addToast } = useToasts();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datas = {
      user_email: userEmail,
      user_password: userPassword,
      stayConnected,
    };
    try {
      await API.post('auth/login', datas);
      history.push('/upload');
      addToast('Vous êtes désormais connecté', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      addToast('Identifiants non reconnus', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      style={
        window.innerWidth < 1000 ? { display: 'flex' } : { display: 'flex' }
      }
    >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: '2.5vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: '#21333b',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Bienvenue sur DaddyTransfer</h1>
          <h2>Le meilleur service de partage de fichiers !</h2>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} alt="logo DaddyTransfer" />
          <Typography
            component="h1"
            variant="h2"
            style={{
              fontFamily: 'Teko, sans-serif',
            }}
          >
            Connectez-vous
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
              id="email"
              label="Adresse email"
              name="user_email"
              autoComplete="email"
              autoFocus
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
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
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Restez connecté"
                value={stayConnected}
                onChange={() => setStayConnected(!stayConnected)}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Connectez-vous
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Créer un compte
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
