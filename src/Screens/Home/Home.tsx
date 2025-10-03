import { View, Text, Button, Image, SectionList, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import makeStyles from './HomeStyle';
import { CommonActions, useNavigation } from '@react-navigation/native';
import useFirebaseAuth from '../../hooks/useGoogleAuth';
import { useResponsive } from '../../hooks/useResponsive';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';
import SafePlace from '../../components/SafePlace';
import { imagePath } from '../../utils/imagepath';
import BookCard from '../../components/BookCard';
import { BOOK_IMAGE } from '../../utils/constants';
import { BlankSpace } from '../../components/BlankSpace';
import { colors } from '../../utils/colors';
import BookStatusCard from '../../components/BookStatusCard';
import { ScreenTypes } from '../../Adapter/Navigation/ScreenTypes';
import { MMKVStorageController } from '../../Adapter/Storage/MMKVStorageController';
import { useAppDispatch } from '../../Adapter/Redux/useAppDispatch';
import { userActions } from '../../Adapter/Redux/Slices/userSlice';
import useBooks from '../../Adapter/firebase/useBooks';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import FontsVariant from '../../utils/FontsVariant';

const Home = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  const { googleSignOut } = useFirebaseAuth();
  const user = useAppSelector(state => state.userReducer.user);
  const dispatch = useAppDispatch();
  const { books, loading,updateBook } = useBooks();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [bookId,setBookId] = useState<string>('')
  const navigation = useNavigation<any>();
  const [currentPage,setCurrentPage] = useState<string>()
  const [totalPages,setTotalPages] = useState<string>()
  const logout = () => {
    googleSignOut()
      .then(() => {
        console.log('Logged out');
        MMKVStorageController.CLEAR_ALL();
        dispatch(userActions.removeUser());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ScreenTypes.SignIn,
              },
            ],
          }),
        );
      })
      .catch(e => {
        console.log('Error while logging out', e);
      });
  };

  // 🔹 Sectioned Data
  const sections = [
    {
      title: 'New Hot Books',
      data: [Array(10).fill(1)], // keep inside array to render one row
    },
    {
      title: 'Your Books',
      data: books,
    },
  ];


  const updateBookHandler = ()=>{
    console.log("The book id>>>",bookId)
    console.log("The book Page>>>",parseInt(currentPage))
    updateBook(bookId,{currentPage:parseInt(currentPage)}).then(res=>{
      console.log("The book updated successfully>>>",res)
    }).catch(e=>{
      console.log("Error updating book>>>",e)
    })
    .finally(()=>{
      actionSheetRef.current?.hide()
    })

  }

  return (
    <SafePlace top>
      <ActionSheet ref={actionSheetRef}>
          <View style={{height:hp(30),width:"100%",padding:wp(8),position:"relative"}}>

            <View style={{
              width:wp(29),
              height:wp(29),
              borderRadius:wp(50),
              backgroundColor:colors.primary,
              position:"absolute",
              top:-wp(15),
              right:"10%",
              justifyContent:"center",
              alignItems:"center",
            }}>
            <Text style={{fontSize:wp(3),fontFamily:FontsVariant.UrbanistSemiBold,color:colors.text}}>Total Pages</Text>
            <Text style={{fontSize:wp(5),fontFamily:FontsVariant.UrbanistSemiBold,color:colors.text}}>{totalPages}</Text>

            </View>


            <Text style={{fontSize:wp(5),fontFamily:FontsVariant.UrbanistSemiBold,color:colors.text}}>Update Book</Text>
            <TextInput
              value={currentPage}
              keyboardType='number-pad'
              onChangeText={setCurrentPage}
              placeholder="Current Page"
              placeholderTextColor={colors.text}
              style={{
                width:"100%",
                backgroundColor:colors.cream,
                color:colors.text,
                padding:wp(5),
                marginTop:wp(5),
                borderRadius:wp(2),
            
              }}
           
            />
            <BlankSpace height={hp(5)}/>
            <TouchableOpacity
            style={{
              width:"100%",
              height:hp(6),
              backgroundColor:colors.primary,
              justifyContent:"center",
              alignItems:"center",
              borderRadius:wp(100),
            }}
            onPress={updateBookHandler}
            >
              {loading ? <ActivityIndicator size="small" color={colors.primary} /> : <Text style={{
                fontSize:wp(5),
                fontFamily:FontsVariant.UrbanistSemiBold,
              }}>Update</Text>}
            </TouchableOpacity>
          </View>
      </ActionSheet>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.text}>Your</Text>
          <Text style={[styles.text, styles.bigText]}>Books</Text>
          <Button
            title="AddBook"
            onPress={() => navigation.navigate(ScreenTypes.Book)}
          />
          <Button title="Logout" onPress={() => logout()} />
        </View>

        <BlankSpace height={hp(5)} />
        <FlatList
          data={books || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <BookStatusCard
                bookName={item?.title}
                author={item?.author}
                currentPage={item?.currentPage}
                totalPages={item?.totalPages}
                status={item?.status}
                bookImage={item?.image}
                onPress={()=>{
                  setBookId(item?.id || '')
                  setTotalPages(item?.totalPages.toString() || "1")
                  setCurrentPage(item?.currentPage.toString() || "1")
                  actionSheetRef.current?.show()
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <BlankSpace height={wp(4)} />}
          contentContainerStyle={styles.colviewFlatlist}
        />
      </View>
    </SafePlace>
  );
};

export default Home;

// <View style={styles.wrapperList}>
//               <SectionList
//                 sections={[{ title: '', data: item }]}
//                 horizontal
//                 contentContainerStyle={styles.rowView}
//                 renderItem={() => <BookCard bookImage={BOOK_IMAGE} />}
//               />
//               <View style={styles.shelf}>
//                 <Image source={imagePath.screw} style={styles.screwImg} />
//                 <Image source={imagePath.screw} style={styles.screwImg} />
//               </View>
//             </View>
