import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {useState,useEffect} from 'react'
const drawerWidth = 240;
const navItems = ['Accueil','Liste des utilisateurs', 'Ajouter','Historique' ];



function DrawerAppBar(props) {

  const [showNavbar,setShowNavbar]=useState(false);
  const location=useLocation();

  useEffect(()=>{
  if(location.pathname==='/login'){
    setShowNavbar(false);
  }
  else{
    setShowNavbar(true);
  }
  },[location])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Reconnaissance faciale
      </Typography>
      <Divider />
      <List>
       <ListItem disablePadding>
        <ListItemButton sx={{ textAlign:'center'}}>
            <ListItemText primary={navItems[0]}/>
        </ListItemButton>
       </ListItem>
       <ListItem disablePadding>
        <ListItemButton sx={{ textAlign:'center'}}>
            <ListItemText primary={navItems[1]}/>
        </ListItemButton>
       </ListItem>
       <ListItem disablePadding>
        <ListItemButton sx={{ textAlign:'center'}}>
            <ListItemText primary={navItems[2]}/>
        </ListItemButton>
       </ListItem>
       <ListItem disablePadding>
        <ListItemButton sx={{ textAlign:'center'}}>
            <ListItemText primary={navItems[3]}/>
        </ListItemButton>
       </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    {showNavbar && (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Link to="/">
          <Button sx={{color:'#fff'}}>
            {navItems[0]}
          </Button>
        </Link>
        <Link to="/liste">
          <Button sx={{color:'#fff'}}>
            {navItems[1]}
          </Button>
        </Link>
        <Link to="/ajouter">
          <Button sx={{color:'#fff'}}>
            {navItems[2]}
          </Button>
        </Link>
          </Box>    
          <Typography
            variant="h6"
            component="div"
            align='right'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Reconnaisance faciale
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
    ) }
    </>
    
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;