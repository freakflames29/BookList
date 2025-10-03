import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';

const appReducer = combineReducers({
  //   theme: themeReducer,
  //   auth: authSlice.reducer,
  //   category: categorySlice.reducer,
  //   service: serviceSlice.reducer,
  //   product: productSlice.reducer,
  //   post: postSlice.reducer,
  //   payment: paymentSlice.reducer,
  //   notification: notificationSlice.reducer,

  userReducer: userSlice.reducer,
});

const rootReducer: Reducer = (state: RootState, action) => {
  if (action.type === 'resetRedux/resetReduxState') {
    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: __DEV__ && {
    shouldCatchErrors: false,
    shouldHotReload: false,
    shouldRecordChanges: false,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
