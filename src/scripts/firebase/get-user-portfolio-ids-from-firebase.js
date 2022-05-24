	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		getDoc,
		doc,
		query,
		collection,
		onSnapshot,
		where,
		documentId
	} from 'firebase/firestore';
	import { envVariables } from '../env-variables';

	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getUserPortfolioIds = async (userId) => {		
		const snap = await getDoc(doc(db, 'users', userId))

		if (snap.exists()) {
			return [...snap.data().pids];
		}
		else {
			console.log("No such document found for users")
		}
}
	const getLiveUserPortfolioIds = async (userId, updateFn) => {		
		// Create the query to load the last 12 messages and listen for new ones.
		const recentMessagesQuery = query(collection(getFirestore(), 'users'), where(documentId(), "==", userId));
		
		// Start listening to the query.
		onSnapshot(recentMessagesQuery, function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
	
					const snap = change.doc.data();				
					if (snap.pids.length > 0) {
						// const pids = snap.pids.map(pid => pid.portfolioId);
						updateFn(snap.pids);
					}
				
			});
		});		
		/*
		const snap = await getDoc(doc(db, 'users', userId))

		if (snap.exists()) {
			return [...snap.data().pids];
		}
		else {
			console.log("No such document found for users")
		} */
	}

  export { getUserPortfolioIds, getLiveUserPortfolioIds };
