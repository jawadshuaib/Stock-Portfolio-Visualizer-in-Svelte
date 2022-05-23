import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { envVariables } from '../scripts/env-variables';

// Initialize Firebase
initializeApp(envVariables.firebaseConfig);
const db = getFirestore();

const insertPortfolioInFirebase = async (name, stocks) => {  
  try {
    const portfolio = await addDoc(collection(db, 'portfolios'), 
    {     
      name,
      stocks,
      createdAt: serverTimestamp()      
    });
    return portfolio.id;
  } catch (error) {
    console.error('Error adding portfolio in Firebase Database', error);
  }
}


export { insertPortfolioInFirebase};
