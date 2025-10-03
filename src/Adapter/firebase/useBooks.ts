// hooks/useBooks.ts
import { useEffect, useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useAppSelector } from '../Redux/useAppSelector';

export type Book = {
  id?: string;           // Firestore doc id
  image: string;
  title: string;
  author: string;
  status: string;       // reading | completed | wishlist
  totalPages: number;
  currentPage: number;
};

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector(state=>state.userReducer.user);

  // 🔹 Subscribe to books realtime
  useEffect(() => {
    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const userBooksRef = firestore()
      .collection('books')
      .doc(user?.data?.user?.id)
      .collection('userBooks');

    const unsubscribe = userBooksRef.onSnapshot(
      snapshot => {
        const fetchedBooks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];
        setBooks(fetchedBooks);
        setLoading(false);
      },
      err => {
        console.error("Error fetching books:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 🔹 Add a book
  const addBook = useCallback(async (book: Book) => {
    try {
      if (!user) throw new Error("No user logged in");
      await firestore()
        .collection('books')
        .doc(user?.data?.user?.id)
        .collection('userBooks')
        .add(book);
      console.log('Book added successfully');
    } catch (e: any) {
      console.error("Error adding book:", e);
      setError(e.message);
    }
  }, [user]);

  // 🔹 Update a book
  const updateBook = useCallback(async (bookId: string, updates: Partial<Book>) => {
    setLoading(true)
    try {
      if (!user) throw new Error("No user logged in");
      await firestore()
        .collection('books')
        .doc(user?.data?.user?.id)
        .collection('userBooks')
        .doc(bookId)
        .update(updates);
    } catch (e: any) {
      console.error("Error updating book:", e);
      setError(e.message);
    }
    setLoading(false)
  }, [user]);

  // 🔹 Delete a book
  const deleteBook = useCallback(async (bookId: string) => {
    try {
      if (!user) throw new Error("No user logged in");
      await firestore()
        .collection('books')
        .doc(user?.data?.user?.id)
        .collection('userBooks')
        .doc(bookId)
        .delete();
    } catch (e: any) {
      console.error("Error deleting book:", e);
      setError(e.message);
    }
  }, [user]);

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;
