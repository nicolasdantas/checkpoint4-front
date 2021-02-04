import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Logo from '../files/DTlogo.png';
import API from '../services/API';
import { LoginContext } from './Contexts/LoginContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable() {
  const { userLogged } = useContext(LoginContext);
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return (
      userLogged &&
      API.get(`/files/users/${userLogged.user_id}`).then((res) =>
        setFiles(res.data)
      )
    );
  }, [userLogged]);

  const deleteFile = (id) => {
    API.delete(`/files/${id}`).then(() =>
      API.get(`/files/users/${userLogged.user_id}`).then((res) =>
        setFiles(res.data)
      )
    );
  };

  return (
    <section style={{ width: '70%', margin: 'auto', paddingLeft: '65px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Logo} alt="logo DaddyTransfer" />
      </div>
      <Typography
        component="h1"
        variant="h2"
        style={{
          marginBottom: '20px',
          fontFamily: 'Teko, sans-serif',
          textAlign: 'center',
        }}
      >
        Mes fichiers envoyés
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Fichier</TableCell>
              <TableCell align="center">Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.file_path}>
                <TableCell component="th" scope="row" align="center">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`${
                      process.env.REACT_APP_API_BASE_URL
                    }/download?file=${file.file_path.split('/')[2]}`}
                  >
                    {file.file_path.split('/')[2]}
                  </a>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={() => deleteFile(file.file_id)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
