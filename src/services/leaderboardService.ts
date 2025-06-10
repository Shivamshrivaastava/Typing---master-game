import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

export interface Score {
  id?: string;
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
  difficulty: string;
  timestamp: Timestamp;
}

export const saveScore = async (scoreData: Omit<Score, 'id' | 'timestamp'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'scores'), {
      ...scoreData,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const getLeaderboard = async (difficulty: string, limitCount: number = 10): Promise<Score[]> => {
  try {
    const q = query(
      collection(db, 'scores'),
      orderBy('wpm', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Score[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};