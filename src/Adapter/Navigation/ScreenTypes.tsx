export enum ScreenTypes {
  Spalsh="Splash",

  // ---------- Auth ----------
  SignIn = 'SignIn',


  // ---------- Home ----------
  Home = 'Home',
}

export type ScreenParamList = {
  [ScreenTypes.Spalsh]: undefined;
  // ---------- Auth ----------
  [ScreenTypes.SignIn]: undefined;
  [ScreenTypes.Home]: {userId:string};
};
