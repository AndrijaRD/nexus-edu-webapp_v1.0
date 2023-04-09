import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyASWE19JL4_LR1JkCoffu0YvnbY636kXAw",
    authDomain: "nexusonlineschool-f50cf.firebaseapp.com",
    projectId: "nexusonlineschool-f50cf",
    storageBucket: "nexusonlineschool-f50cf.appspot.com",
    messagingSenderId: "122129019296",
    appId: "1:122129019296:web:54e2c6554b626f2e1834c5",
    measurementId: "G-2WXMPE5E7G"
};

initializeApp(firebaseConfig);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button onClick={handleEmailLogin}>Login with Email</button>
    </div>
  );
}

export default App;
