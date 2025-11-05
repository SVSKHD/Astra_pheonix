import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: Replace with your own Firebase project configuration
export const firebaseConfig = {
 apiKey: "AIzaSyAvTW0LWeAtzvaC_fAEJmd7akXmIc8Wwrw",
  authDomain: "spasta-personal-finance.firebaseapp.com",
  databaseURL: "https://spasta-personal-finance-default-rtdb.firebaseio.com",
  projectId: "spasta-personal-finance",
  storageBucket: "spasta-personal-finance.firebasestorage.app",
  messagingSenderId: "616298926621",
  appId: "1:616298926621:web:fb000c48b4f7dac325ecf4",
  measurementId: "G-0MBNYMETF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const db = getFirestore(app);