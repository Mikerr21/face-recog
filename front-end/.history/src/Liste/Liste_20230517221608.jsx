import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData=(name, calories, fat, carbs, protein)=> {
  return { name, calories, fat, carbs, protein };


export default function Ajouter() {
  
  useEffect(()=>{
    const fetchData=sync()=>{
     await axios.get('http://localhost:3000/users').then((res)=>{
      setData(res);
     });
    }
    
    fetchData();
  },[])
  const [data,setData]=useState(null);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom & Prénom</TableCell>
            <TableCell align="right">Numero / Email / Date de naissance</TableCell>
            <TableCell align="right">Debut</TableCell>
            <TableCell align="right">Fin</TableCell>
            <TableCell align="right">Photo choissi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}