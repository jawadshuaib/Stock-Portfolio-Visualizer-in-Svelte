	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		collection,
		addDoc,
		serverTimestamp
	} from 'firebase/firestore';
	import { envVariables } from '../scripts/env-variables';

	// Initialize Firebase
	const app = initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const createFirebaseUser = async () => {
		try {
			const newUser = await addDoc(collection(db, 'users'), {
				pids: [],
				createdAt: serverTimestamp()
			});
      return newUser.id;
		} catch (error) {
			console.error('Error adding new user to Firebase Database', error);
		}
	}

  export { createFirebaseUser };
