	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		collection,
		addDoc,
		serverTimestamp
	} from 'firebase/firestore';
	import { envVariables } from '../env-variables';

	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
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
