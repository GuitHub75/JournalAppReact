
import {collection, getDocs} from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config';
export const loadNote = async (uid ='') => {
    if(!uid) throw new Error('El UID del usuario no existe');
    const collectionref = collection(FirebaseDB,`${uid}/journal/notes`); 
    const docs = await getDocs(collectionref);

    console.log(docs);
    const notes =[];

    docs.forEach(doc =>{
       notes.push({id: doc.id,...doc.data()})
    });
    console.log(notes);
    return notes;
}
