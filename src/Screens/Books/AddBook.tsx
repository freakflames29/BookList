import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import SafePlace from '../../components/SafePlace';
import useBooks, { Book } from '../../Adapter/firebase/useBooks';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';
import { useNavigation } from '@react-navigation/native';
import makeStyles from './AddBookStyle';
import { colors } from '../../utils/colors';
import AppButton from '../../components/AppButton';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { BlankSpace } from '../../components/BlankSpace';
import { useResponsive } from '../../hooks/useResponsive';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
const AddBook = () => {
  const { addBook } = useBooks();
  const [bookLoading, setBookLoading] = useState<boolean>(false);
  const user = useAppSelector(state => state.userReducer.user);
  const [bookName, setBookName] = React.useState<string>('');
  const navigation = useNavigation();
  const { wp, hp } = useResponsive();
  const styles = makeStyles();
  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));
  const addBookSchema = yup.object({
    title: yup.string().required('Book name is required'),
    author: yup.string().required('Author name is required'),
    image: yup.string().required('Image is required'),
    status: yup.string().required('Status is required'),
    totalPages: yup.number().required('Total pages is required'),
    currentPage: yup.number().required('Current page is required'),
  });

  const addBookHandler = (payload: Book) => {
    // const payload: Book = {
    //   author: 'Prabhupada',
    //   currentPage: 1,
    //   image: 'x',
    //   status: 'reading',
    //   title: bookName,
    //   totalPages: 10,
    setBookLoading(true);
    addBook(payload)
      .then(res => {
        console.log('Book added successfully');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Error adding book', e);
      })
      .finally(() => {
        setBookLoading(false);
      });
    console.log('payload', payload);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      image: '',
      status: 'reading',
      totalPages: '',
      currentPage: '',
    },
    validationSchema: addBookSchema,
    onSubmit: values => {
      console.log('values', values);
      const payload: Book = {
        ...values,
        currentPage: parseInt(values.currentPage),
        totalPages: parseInt(values.totalPages),
      };
      addBookHandler(payload);
    },
  });

  return (
    <SafePlace top>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        // keyboardVerticalOffset={hp(10)}
      >
        <Animated.ScrollView contentContainerStyle={[styles.container]}>
          <Text style={styles.headingText}>Add Book</Text>
          <TextInput
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
            placeholder="Book Name"
            placeholderTextColor={colors.text}
            style={styles.textBoxStyle}
          />
          {formik.touched.title && formik.errors.title && (
            <Text style={styles.errorText}>*{formik.errors.title}</Text>
          )}
          <TextInput
            value={formik.values.author}
            onChangeText={formik.handleChange('author')}
            placeholder="Author Name"
            placeholderTextColor={colors.text}
            style={styles.textBoxStyle}
          />
          {formik.touched.author && formik.errors.author && (
            <Text style={styles.errorText}>*{formik.errors.author}</Text>
          )}
          <TextInput
            value={formik.values.image}
            onChangeText={formik.handleChange('image')}
            placeholder="Image URL"
            placeholderTextColor={colors.text}
            style={styles.textBoxStyle}
          />
          {formik.touched.image && formik.errors.image && (
            <Text style={styles.errorText}>*{formik.errors.image}</Text>
          )}
          <TextInput
            value={formik.values.totalPages}
            onChangeText={formik.handleChange('totalPages')}
            placeholder="Total Pages"
            keyboardType="numeric"
            placeholderTextColor={colors.text}
            style={styles.textBoxStyle}
          />
          {formik.touched.totalPages && formik.errors.totalPages && (
            <Text style={styles.errorText}>*{formik.errors.totalPages}</Text>
          )}
          <TextInput
            value={formik.values.currentPage}
            onChangeText={formik.handleChange('currentPage')}
            placeholder="Current Page"
            keyboardType="numeric"
            placeholderTextColor={colors.text}
            style={styles.textBoxStyle}
          />
          {formik.touched.currentPage && formik.errors.currentPage && (
            <Text style={styles.errorText}>*{formik.errors.currentPage}</Text>
          )}

          <BlankSpace height={wp(5)} />
          <AppButton
            text="Add Book"
            onPress={formik.handleSubmit}
            loading={bookLoading}
          />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </SafePlace>
  );
};

export default AddBook;
