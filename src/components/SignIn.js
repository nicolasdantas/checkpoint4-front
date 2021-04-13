import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Logo from '../files/DTlogo.png';
import API from '../services/API';
import './Style/SignIn.scss';

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

export default function SignInSide() {
  const history = useHistory();
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
    <div className="signin-wrapper">
      <div className="signin-picture">
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
      </div>
      <div className="signin-form-container">
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
          className="signin-form"
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
          <div className="signin-button">
            <Button type="submit" variant="contained" color="primary">
              Connectez-vous
            </Button>
          </div>
          <div className="signin-links">
            <div>
              <Link href="/forgot-password" variant="body2">
                Mot de passe oublié ?
              </Link>
            </div>
            <div>
              <Link href="/signup" variant="body2">
                Créer un compte
              </Link>
            </div>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </div>
  );
}
