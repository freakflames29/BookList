export enum ScreenTypes {
  Spalsh="Splash",

  // ---------- Auth ----------
  SignIn = 'SignIn',
  Profile = 'Profile',


  // ---------- Home ----------
  Home = 'Home',

  Book="Book"
}

export type ScreenParamList = {
  [ScreenTypes.Spalsh]: undefined;
  // ---------- Auth ----------
  [ScreenTypes.SignIn]: undefined;
  [ScreenTypes.Home]: {userId:string};
  [ScreenTypes.Book]:undefined;
  [ScreenTypes.Profile]:undefined;
};
