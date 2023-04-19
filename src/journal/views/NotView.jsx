import { DeleteOutline, DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImgGalery } from "../components/ImgGalery"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { isSavingNote, setActiveNote, startDeletingNote, startSaveNote, startUploadingFile } from "../../store/journal"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useRef } from "react"

export const NotView = () => {

  const dispatch = useDispatch();

  const {active:note, messageSave, isSaving} = useSelector(state => state.journal);
 
  const {body, title, date, onInputChange, formState} = useForm(note);
 
  const dateString = useMemo(()=>{
    const newdate = new Date(date);
    return newdate.toUTCString();
  },[date])

  const fileInputRef = useRef();


  useEffect(() => {
    dispatch(setActiveNote(formState));
  },[formState])
  
  useEffect(() => {
    if(messageSave.length > 0){
      Swal.fire('Nota Actualizada', messageSave, 'success' )
    }  
  }, [messageSave]);
  

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

   const onFileInputChange = ({ target }) =>{
    if(target.files === 0) return;

    dispatch(startUploadingFile(target.files));
   }

   const onDelete = () =>{
      dispatch(startDeletingNote());
   }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
        <Grid item>
            <Typography variant="" fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
           <input type="file" multiple ref={fileInputRef} onChange={ onFileInputChange} style={{display: 'none'}} />
           <IconButton
            color="primary"
            disabled={isSaving}
            onClick={()=> fileInputRef.current.click()}
           >
             <UploadOutlined />
           </IconButton>
            <Button 
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary"
             sx={{padding:2}} >
                
                <SaveOutlined sx={{fontSize:30, mr:1}}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
             <TextField
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un título"
              label="Título"
              sx={{border:'none', mb:1}}
              name="title"
              value={title}
              onChange={onInputChange}
             />
             <TextField
              type="text"
              variant="filled"
              fullWidth
              multiline
              placeholder="¿Que sucedio en el dia de hoy?"
              minRows={5}
              name="body"
              value={body}
              onChange={onInputChange}
             />
        </Grid>
           <Grid container justifyContent='end'>
            <Button onClick={onDelete} sx={{mt:2}} color="error">
                 <DeleteOutlined />
                 Borrar
            </Button>
        </Grid>
        <ImgGalery images={note.imageUrls}/>
    </Grid>
  )
}
