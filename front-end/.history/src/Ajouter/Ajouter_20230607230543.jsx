import react,{useRef,useState,useCallback} from 'react';
import axios from 'axios';
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import {Box} from '@mui/material/';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import {Button} from '@mui/material'
import './Ajouter.css'

function Ajouter() {
    const navigateTo = useNavigate();


    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null); // initialize it

    const capture = useCallback((event) => {
    event.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const byteCharacters = atob(imageSrc.split(',')[1]);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
   const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' });

      formData.set('image', blob,'photo.jpg');

    }, [webcamRef]);

    const retake = () => {
      setImgSrc(null);
    };

    const [formData, setFormData] = useState(new FormData());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [click,setClick]=useState(false);


  
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        formData.set('image', selectedFile);
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
      
        // Perform any validation or additional logic here
      
        // Execute the axios post request
        await axios
          .post("http://localhost:3000/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            console.log(response);
            navigateTo("/liste");
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
      };

      const handleNomChange = (event) => {
        const newName = event.target.value;
        formData.set('nom', newName);
      };
      const handlePrenomChange = (event) => {
        const newName = event.target.value;
        formData.set('prenom', newName);
      };
      const handleEmailChange = (event) => {
        const newName = event.target.value;
        formData.set('email', newName);
      };
      const handleNaissanceChange = (event) => {
        const newName = event.target.value;
        formData.set('code', newName);
      };
     
      const handleNumeroChange = (event) => {
        const newName = event.target.value;
        formData.set('numero', newName);
      };
      const handlePassChange =(event)=>{
        const newPass=event.target.value;
        formData.set('password',newPass);
      }
      const handleStartTime=(event)=>{
        // const newParameter=event.toString().slice(0,24);
        setStartTime(event);
        formData.set('debut',event)
        // console.log(newParameter)
      }
      const handleEndTime=(event)=>{
        // const newParameter=event.toString().slice(0,24);
        setEndTime(event);
        formData.set('fin',event)
        // console.log(newParameter)
      }
   
   const Snap =(e)=>{
      e.preventDefault();
      setClick(true);
   }
  

   const [hasPhoto,setHasPhoto]=useState(false);
   

    return (
        <form encType='multipart/form-data'>

        <Grid container>
         <Box sx={{
            width: 500, 
          }}> 
        <Typography fontSize={32} mb={2}>Veuillez remplir la formulaire</Typography>
 
       <Grid container spacing={4}>
        <Grid xs={6}><TextField onChange={handleNomChange} name='nom'  label="Nom" variant="outlined" /></Grid>
        <Grid xs={6}><TextField onChange={handlePrenomChange} name='prenom'  label="Prénom" variant="outlined" /></Grid>
        <Grid xs={6}><TextField onChange={handleNumeroChange} name='numero' label="Numéro de téléphone" variant="outlined" /></Grid>
        <Grid xs={6}><TextField onChange={handleEmailChange} type={'email'} name='email'  label="E-Mail" variant="outlined" /></Grid>
        <Grid xs={6}><TextField onChange={handlePassChange} type='password' name='password'  label="Mot de passe" variant="outlined" /></Grid>
        <Grid xs={6}><TextField onChange={handleNaissanceChange} name='code' label="Code d'immatriculation" variant="outlined" /></Grid>
        <Grid xs={6} >
        <Typography sx={{fontSize:22}}>Date de début</Typography>
        <DatePicker 
        selected={startTime} 
        onChange={handleStartTime}
        showTimeSelect
        dateFormat="Pp"
        />
        </Grid>      
        <Grid xs={6} >
        <Typography sx={{fontSize:22}}>Date de fin</Typography>
        <DatePicker 
        selected={endTime} 
        onChange={handleEndTime}
        showTimeSelect
        dateFormat="Pp"
        />
        </Grid>   
       </Grid>
        <Box>
        <Grid container>
        <Grid xs={6} mt={2}>
            <Typography variant="outlined">
            Choisir un photo de votre PC 
            </Typography>
            <input name='image'  type="file"  onChange={handleImageChange} accept="image/png, image/jpeg,image/jpg" />
            </Grid>

        <Grid xs={6} mt={2}>
            <Button onClick={Snap}  variant="outlined">Prendre un photo à l instant </Button>
        </Grid>
        </Grid>
        </Box>
        <Grid mt={2}>
        <Button type="submit" onClick={handleFormSubmit} variant="outlined">Submit</Button>
        <Button sx={{marginLeft:1}} onClick={()=>{navigateTo("/")}} variant="outlined">Annuler</Button>
        </Grid>
        </Box>
        

         <Box sx={{width:500}}>
        {click? (
       <div className="container">
       {imgSrc ? (
         <img src={imgSrc} alt="webcam" />
       ) : (
         <Webcam height={600} width={600} ref={webcamRef} />
       )}
       <div className="btn-container">
         {imgSrc ? ( <>
           <Button variant='outlined' onClick={retake}>Retake photo</Button>
           <Button variant='outlined' sx={{marginLeft:1}}   onClick={()=>setClick(false)}>Annuler</Button>
           </>
         ) : (<>
           <Button variant='outlined' onClick={capture}>Capture photo</Button>
           <Button sx={{marginLeft:1}}  variant='outlined' onClick={()=>setClick(false)}>Annuler</Button>
           </>

         )}
       </div>
     </div>
        ) : null}
        </Box> 

        </Grid>
        
        </form>
        
      );
}

export default Ajouter;
