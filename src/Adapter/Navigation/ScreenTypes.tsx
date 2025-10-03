export enum ScreenTypes {
  // ---------- Auth ----------
  SignIn = 'SignIn',


  // ---------- Home ----------
  Home = 'Home',
}

export type ScreenParamList = {
  // ---------- Auth ----------
  [ScreenTypes.SignIn]: undefined;
  [ScreenTypes.Home]: {userId:string};
};
