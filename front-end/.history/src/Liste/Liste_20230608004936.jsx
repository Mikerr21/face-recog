import * as React from 'react';
import { useState,useEffect,useContext,createContext } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';



export default function Ajouter() {
  const navigateTo = useNavigate();

  const handleDelete=async(e)=>{
    await axios.delete(`http://localhost:3000/${e}`).then(()=>window.location.reload(true));
  }
  const [data,setData]=useState(null);
  
  useEffect(()=>{
    const fetchData=async()=>{
     await axios.get('http://localhost:3000/users').then((res)=>{setData(res.data);console.log(res)});
    }
    fetchData();
  },[])
  
  

  return (
    <TableContainer sx={{mt:1}}  component={Paper}>
      <Table  sx={{ minWidth: 1180,minHeight:509 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><span style={{fontWeight:'bold'}}>Nom & Prénom</span></TableCell>
            <TableCell align="center"><span style={{fontWeight:'bold'}}>Email</span></TableCell>
            <TableCell align="right"><span style={{fontWeight:'bold'}}>G.S.M</span></TableCell>
            <TableCell align="center"><span style={{fontWeight:'bold'}}>Code d'immatriculation</span></TableCell>
            <TableCell align="right"><span style={{fontWeight:'bold'}}>Photo choissi</span></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data? (data.map((row) => (
            
            <TableRow
              key={Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <span style={{fontWeight:'bold'}}>{row.nom} {row.prenom}</span>
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.numero}</TableCell>
              <TableCell align="center">{row.code}</TableCell>
              <TableCell align="right"><img   style={{ width: 100, height: 100 }} src={`${row.url}`} /></TableCell>
              <TableCell><Button onClick={()=>handleDelete(row._id)} value={row._id} sx={{mb:1,width:20}}  color='inherit'><img src={'../../public/delete.png'}></img></Button><br />
              <Button onClick={()=>navigateTo(`/${row._id}`)} value={row._id}  sx={{width:20}}  color='success'><img width={20} src={'../../public/edit.png'}></img></Button></TableCell>
            </TableRow>)
            
            )):
            (null)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
