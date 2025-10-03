import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import SafePlace from '../../components/SafePlace';
import useBooks, { Book } from '../../Adapter/firebase/useBooks';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';
import { useNavigation } from '@react-navigation/native';

const AddBook = () => {
  const { addBook } = useBooks();
  const user = useAppSelector(state => state.userReducer.user);
  const [bookName, setBookName] = React.useState<string>('');
 const navigation = useNavigation();
  const addBookHandler = () => {
    const payload: Book = {
      author: 'Prabhupada',
      currentPage: 1,
      image: 'x',
      status: 'reading',
      title: bookName,
      totalPages: 10,
    };
    addBook(payload).then(res => {
      console.log('Book added successfully');
     navigation.goBack()
    }).catch(e=>{
      console.log('Error adding book',e)
    })
    console.log('payload', payload);
  };

  return (
    <SafePlace top>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>AddBook</Text>
        <TextInput
          value={bookName}
          onChangeText={setBookName}
          placeholder="Book Name"
            placeholderTextColor={"red"}
          style={{
            width: '80%',
            backgroundColor:"#000",
            color:'red'
        
          }}
        />
        <Button title='Add Book' onPress={addBookHandler} />
      </View>
    </SafePlace>
  );
};

export default AddBook;
