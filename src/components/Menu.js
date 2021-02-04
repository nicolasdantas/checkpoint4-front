import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Typography from '@material-ui/core/Typography';
import API from '../services/API';
import { LoginContext } from './Contexts/LoginContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const { userLogged } = useContext(LoginContext);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const logout = async () => {
    try {
      await API.get('auth/logout');
      addToast('Vous avez bien été deconnecté', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
      // setUserLogged(null);
    } catch (err) {
      addToast("Vous n'avez pas été déconnecté", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    location.pathname !== '/' &&
    location.pathname !== '/forgot-password' &&
    !location.pathname.includes('reset') && (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          {userLogged && (
            <>
              {open && (
                <Typography
                  component="h4"
                  variant="h4"
                  style={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    fontFamily: 'Teko, sans-serif',
                    textAlign: 'center',
                  }}
                >
                  Bienvenue {userLogged.user_firstname}
                </Typography>
              )}
              <img
                style={{
                  width: '50%',
                  clipPath: 'circle()',
                  margin: 'auto',
                  marginTop: 0,
                  marginBottom: 0,
                }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${userLogged.user_image}`}
                alt={userLogged.user_lastname}
              />
            </>
          )}
          <List>
            <Link
              to="/upload"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem button key="Envoyer un fichier">
                <ListItemIcon>
                  <ReplyAllIcon style={{ marginLeft: '8px' }} />
                </ListItemIcon>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{
                    fontFamily: 'Teko, sans-serif',
                  }}
                >
                  Envoyer un fichier
                </Typography>
              </ListItem>
            </Link>
          </List>
          <List>
            <Link
              to="/my-files"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem button key="Mes fichiers">
                <ListItemIcon>
                  <AttachFileIcon style={{ marginLeft: '8px' }} />
                </ListItemIcon>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{
                    fontFamily: 'Teko, sans-serif',
                  }}
                >
                  Mes fichiers
                </Typography>
              </ListItem>
            </Link>
          </List>
          <List>
            <Link
              to="/profile"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem button key="Mes informations">
                <ListItemIcon>
                  <PermIdentityIcon style={{ marginLeft: '8px' }} />
                </ListItemIcon>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{
                    fontFamily: 'Teko, sans-serif',
                  }}
                >
                  Mes informations
                </Typography>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button key="Deconnexion" onClick={() => logout()}>
              <ListItemIcon>
                <ExitToAppIcon style={{ marginLeft: '8px' }} />
              </ListItemIcon>
              <Typography
                component="h5"
                variant="h5"
                style={{
                  fontFamily: 'Teko, sans-serif',
                }}
              >
                Déconnexion
              </Typography>
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  );
}
