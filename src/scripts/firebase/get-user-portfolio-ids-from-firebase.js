	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		getDoc,
		doc,
	} from 'firebase/firestore';
	import { envVariables } from '../env-variables';

	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getUserPortfolioIds = async (userId) => {		
		const snap = await getDoc(doc(db, 'users', userId))

		if (snap.exists()) {
			return [...new Set (snap.data().pids)];
		}
		else {
			console.log("No such document found for users")
		}
	}

  export { getUserPortfolioIds };
