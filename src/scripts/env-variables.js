export const envVariables = {  
  isDeveloperMode: false,
  corsAnywhereProxy: 'https://glacial-brushlands-90091.herokuapp.com/',
  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_apiKey,
    appId: import.meta.env.VITE_FIREBASE_appId,
    authDomain: "portfolio-visualizer-a6a8c.firebaseapp.com",
    projectId: "portfolio-visualizer-a6a8c",
    storageBucket: "portfolio-visualizer-a6a8c.appspot.com",
    messagingSenderId: "584761572986",    
    measurementId: "G-5WG209V3TX"    
  }  
};
