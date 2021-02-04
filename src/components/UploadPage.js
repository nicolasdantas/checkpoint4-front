/* eslint-disable react/jsx-props-no-spreading */
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
import LinearProgress from '@material-ui/core/LinearProgress';
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

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(
            // eslint-disable-next-line react/destructuring-assignment
            props.value
          )}%`}
        </Typography>
      </Box>
    </Box>
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
  useEffect(() => {
    API.get('/me').then((res) => {
      setUserLogged(res.data);
    });
  }, []);

  const classes = useStyles();
  const { addToast } = useToasts();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [file, setFile] = useState([]);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [key, setKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('recipient', recipientEmail);
    formData.append('file', file[0]);
    formData.append('file_expire', '');

    try {
      await API.post('files', formData, {
        onUploadProgress: (progressEvent) => {
          setPercentCompleted(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      addToast('Fichier envoyé !', {
        appearance: 'success',
        autoDismiss: true,
      });
      e.target.reset();
      setPercentCompleted(0);
      setKey(key + 1);
    } catch (err) {
      setPercentCompleted(0);
      addToast("Erreur durant l'envoi du fichier", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingLeft: '65px' }}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Logo} alt="logo DaddyTransfer" />
      </div>
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h2"
          style={{
            marginBottom: '20px',
            fontFamily: 'Teko, sans-serif',
            textAlign: 'center',
          }}
        >
          Envoyez un fichier !
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <DropzoneArea
            key={key}
            maxFileSize={1048576000}
            onChange={(files) => setFile(files)}
            filesLimit={1}
            dropzoneText="Déposez un fichier ici ou cliquez pour parcourir (maxi 10Mo)"
          />

          <div style={{ margin: '20px' }}>
            <LinearProgressWithLabel value={percentCompleted} />
          </div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email de votre destinataire"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setRecipientEmail(event.target.value)}
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
