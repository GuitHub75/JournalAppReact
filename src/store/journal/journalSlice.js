import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
initialState:{
  isSaving: false,
  messageSave:'',
  notes:[],
  active:null
  /*active:{
    id:'ABC',
     title:'',
     body:'',
     date:1234567,
     imageUrls:[],
  }*/
},
  reducers: {
    isSavingNote: (state)=>{
      state.isSaving = true
    },
    addNewEmptyNote:(state, action) =>{
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote:(state, action)=>{
      state.active = action.payload;
      state.messageSave = "";
    },
    setNote:(state, action)=>{
      state.notes = action.payload
    },
    setSaving:(state)=>{
      state.isSaving = true;
      state.messageSave = "";
    },
    updateNote:(state, action)=>{
      console.log(action.payload);
      state.isSaving = false;
      state.notes = state.notes.map( note =>{
        if(note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });
      state.messageSave = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote:(state, action)=>{
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
    },
    clearNoteLogout : (state) => {
      state.isSaving=false;
      state.messageSave ='';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById:(state, action)=>{
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    }
  },
})

export const { 
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
  deleteNoteById,
  isSavingNote,
  setPhotosToActiveNote,
  clearNoteLogout
} = journalSlice.actions;