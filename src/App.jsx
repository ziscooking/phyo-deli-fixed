import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously
} from 'firebase/auth';

import Login from './pages/Login';
import Register from './pages/Register';

const firebaseConfig = {
  apiKey: "AIzaSyD1qrQpU4iONJu0AQ6ufTT5XKZvePSqaRw",
  authDomain: "phyo-deli.firebaseapp.com",
  projectId: "phyo-deli",
  storageBucket: "phyo-deli.firebasestorage.app",
  messagingSenderId: "975439089540",
  appId: "1:975439089540:web:27a20f4267b68c055bd7d1"
};

function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    signInAnonymously(auth)
      .then(() => {
        const storesRef = collection(db, 'stores');
        onSnapshot(storesRef, (snapshot) => {
          const storeList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStores(storeList);
        });
      })
      .catch((error) => {
        console.error('Firebase auth error:', error);
      });
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Phyo Deli 🛵</h1>
      <p className="mb-4">Choose your favorite store:</p>
      <div className="flex flex-wrap gap-4">
        {stores.map(store => (
          <div key={store.id} className="border p-4 w-64 rounded shadow">
            <img src={store.image} alt={store.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl mt-2 font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
