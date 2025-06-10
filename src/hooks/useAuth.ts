import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signInAnonymous } from '../services/authService';
import { generateUsername } from '../utils/typingCalculations';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        setUser(user);
        // Generate a username for the user if they don't have one
        const storedUsername = localStorage.getItem(`username_${user.uid}`);
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          const newUsername = generateUsername();
          setUsername(newUsername);
          localStorage.setItem(`username_${user.uid}`, newUsername);
        }
      } else {
        // Auto sign-in anonymously
        const signedInUser = await signInAnonymous();
        if (signedInUser) {
          setUser(signedInUser);
          const newUsername = generateUsername();
          setUsername(newUsername);
          localStorage.setItem(`username_${signedInUser.uid}`, newUsername);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, username, loading };
};