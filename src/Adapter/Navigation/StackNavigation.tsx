import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../Screens/Auth/SignIn';
import { ScreenTypes,ScreenParamList } from './ScreenTypes';
import Home from '../../Screens/Home/Home';
import Spalsh from '../../Screens/Spalsh/Spalsh';
import AddBook from '../../Screens/Books/AddBook';

const Stack = createStackNavigator<ScreenParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenTypes.Spalsh}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >

      {/* Auth Screens */}
      <Stack.Screen name={ScreenTypes.SignIn} component={SignIn} />
      <Stack.Screen name={ScreenTypes.Spalsh} component={Spalsh} />


      {/* Home Screens */}
      <Stack.Screen name={ScreenTypes.Home} component={Home} />
      <Stack.Screen name={ScreenTypes.Book} component={AddBook} />
    </Stack.Navigator>
  );
};
export default StackNavigation;
