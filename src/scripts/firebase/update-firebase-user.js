// Provide an updated list of portfolio ids to the user in Firebase.
import { initializeApp } from 'firebase/app';
import { getUserPortfolioIds } from './get-user-portfolio-ids-from-firebase';
import {
  getFirestore,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { envVariables } from '../env-variables';

// Initialize Firebase
initializeApp(envVariables.firebaseConfig);
const db = getFirestore();

const updateFirebaseUser = async (userId, portfolioId) => {
  if (userId && portfolioId) {
    let userPortfolioIds = await getUserPortfolioIds(userId);
    // Add the new portfolio id to the list of portfolio ids
    // if it doesn't already exist.
    if (!userPortfolioIds.includes(portfolioId)) {
      userPortfolioIds = [...userPortfolioIds, portfolioId];
    }
    await updateDoc(doc(db, 'users', userId), {
      pids: userPortfolioIds,
    });
  }
};

export { updateFirebaseUser };
