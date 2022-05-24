// Provide an updated list of portfolio ids to the user in Firebase.
import { initializeApp } from 'firebase/app';
import { getUserPortfolioIds } from './get-user-portfolio-ids-from-firebase';
import {
  getFirestore,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { envVariables } from '../env-variables';

// Initialize Firebase
initializeApp(envVariables.firebaseConfig);
const db = getFirestore();

const updateFirebaseUser = async (userId, portfolioId) => {
  if (userId && portfolioId) {
    let pids = await getUserPortfolioIds(userId);
    // Add the new portfolio id to the list of portfolio ids
    // if it doesn't already exist.
    if (!pids.includes(portfolioId)) {
      const createdAt = Timestamp.fromDate(new Date());
      const pid = {
        portfolioId,
        createdAt
      }
      pids = [...pids, pid];
    }
    await updateDoc(doc(db, 'users', userId), {
      pids
    });
  }
};

// Note, we remove this portfolio from the user but it remains present in the
// portfolios collection. This way, others can still access it if they have the link to it.
const removePortfolioFromFirebase = async (userId, portfolioId) => {
  if (userId && portfolioId) {
    let pids = await getUserPortfolioIds(userId);
    // Remove the portfolio id from the list of portfolio ids
    // if it exists.      
    pids = pids.filter(pid => pid.portfolioId !== portfolioId);
      
    return await updateDoc(doc(db, 'users', userId), {
      pids
    }); 
  }
};

export { updateFirebaseUser, removePortfolioFromFirebase };
