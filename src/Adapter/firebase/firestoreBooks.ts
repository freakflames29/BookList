// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// export type Book = {
//   image: string;
//   title: string;
//   author: string;
//   status: "reading" | "completed" | "wishlist";
//   totalPages: number;
//   currentPage: number;
// };

// // 🔹 Add a new book
// export const addBook = async (book: Book) => {
//   try {
//     const user = auth().currentUser;
//     if (!user) throw new Error("No user logged in");

//     const userBooksRef = firestore()
//       .collection('books')
//       .doc(user.uid)
//       .collection('userBooks');

//     await userBooksRef.add(book);
//     console.log("Book added successfully");
//   } catch (e) {
//     console.error("Error adding book:", e);
//   }
// };

// // 🔹 Subscribe to user books (realtime updates)
// export const subscribeUserBooks = (callback: (books: any[]) => void) => {
//   const user = auth().currentUser;
//   if (!user) return;

//   const userBooksRef = firestore()
//     .collection('books')
//     .doc(user.uid)
//     .collection('userBooks');

//   return userBooksRef.onSnapshot(snapshot => {
//     const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     callback(books);
//   });
// };

// // 🔹 Update a book (e.g., status or currentPage)
// export const updateBook = async (bookId: string, updates: Partial<Book>) => {
//   try {
//     const user = auth().currentUser;
//     if (!user) return;

//     const bookRef = firestore()
//       .collection('books')
//       .doc(user.uid)
//       .collection('userBooks')
//       .doc(bookId);

//     await bookRef.update(updates);
//     console.log("Book updated successfully");
//   } catch (e) {
//     console.error("Error updating book:", e);
//   }
// };

// // 🔹 Delete a book
// export const deleteBook = async (bookId: string) => {
//   try {
//     const user = auth().currentUser;
//     if (!user) return;

//     const bookRef = firestore()
//       .collection('books')
//       .doc(user.uid)
//       .collection('userBooks')
//       .doc(bookId);

//     await bookRef.delete();
//     console.log("Book deleted successfully");
//   } catch (e) {
//     console.error("Error deleting book:", e);
//   }
// };
