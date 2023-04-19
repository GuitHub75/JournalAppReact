import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, isSavingNote, setActiveNote, setNote, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNote } from "../../helpers";


export const startNewNote =()=>{
  
    return async(dispatch, getState)=>{

         dispatch(isSavingNote())
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body:'',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB,`${ uid }/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);
        

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe')
       const notes = await loadNote(uid);
        dispatch(setNote(notes));
    }
}


export const startSaveNote = () => {

    return async(dispatch, getState)=>{

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}` );

        await setDoc(docRef,noteToFireStore,{merge: true});
        
        dispatch(updateNote(note));
    }
}

export const startUploadingFile = ( files = [] ) => {
   return async(dispatch)=>{
     dispatch(setSaving());
     // await fileUpload(files[0]);
     const fileUploadPromises = [];
     for(const file of files){
        fileUploadPromises.push(fileUpload(file));
     }
    const photosUrl=  await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote( photosUrl ));
    console.log(photosUrl);
   }
}

export const startDeletingNote = () => {
    return async(dispatch, getState)=>{
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);
          await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}