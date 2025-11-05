
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  writeBatch,
  increment,
  getDocs,
  collectionGroup,
} from 'firebase/firestore';
// FIX: Import necessary authentication modules from Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { db } from '../firebase';
import { User, Post, Todo } from '../types';
import { INITIAL_POSTS } from '../constants';

// --- COLLECTION NAMES ---
const USERS_COLLECTION = 'astra_users';
const POSTS_COLLECTION = 'astra_posts';
const TODOS_COLLECTION = 'astra_todos';

// FIX: Implement and export authentication functions
// --- AUTHENTICATION ---
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const githubProvider = new GithubAuthProvider();
export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};


// --- POSTS ---

export const streamPosts = (callback: (posts: Post[]) => void) => {
  const postsQuery = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(postsQuery, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    callback(posts);
  });
};

export const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
  return addDoc(collection(db, POSTS_COLLECTION), {
    ...postData,
    createdAt: new Date().toISOString(),
    views: 0,
  });
};

export const incrementPostView = (postId: string) => {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  return updateDoc(postRef, {
    views: increment(1)
  });
};


// --- TODOS ---

export const streamTodos = (userId: string, callback: (todos: Todo[]) => void) => {
  const todosQuery = query(collection(db, USERS_COLLECTION, userId, TODOS_COLLECTION));
  return onSnapshot(todosQuery, (querySnapshot) => {
    const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));
    callback(todos);
  });
};

export const addTodo = (userId: string, text: string) => {
  return addDoc(collection(db, USERS_COLLECTION, userId, TODOS_COLLECTION), {
    text,
    completed: false,
  });
};

export const toggleTodo = (userId: string, todoId: string, completed: boolean) => {
  const todoRef = doc(db, USERS_COLLECTION, userId, TODOS_COLLECTION, todoId);
  return updateDoc(todoRef, { completed });
};

export const deleteTodo = (userId: string, todoId: string) => {
  const todoRef = doc(db, USERS_COLLECTION, userId, TODOS_COLLECTION, todoId);
  return deleteDoc(todoRef);
};


// --- DATA SEEDING ---
let seeded = false;
export const seedInitialData = async () => {
  if (seeded) return;
  seeded = true;

  try {
    const postsCollection = collection(db, POSTS_COLLECTION);
    const q = query(postsCollection, limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No posts found. Seeding initial data...');
      const batch = writeBatch(db);
      INITIAL_POSTS.forEach((post) => {
        const docRef = doc(postsCollection);
        batch.set(docRef, post);
      });
      await batch.commit();
      console.log('Initial data seeded successfully.');
    } else {
       console.log('Posts collection is not empty. Skipping seed.');
    }
  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};
