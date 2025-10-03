import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../Screens/Auth/SignIn';
import { ScreenTypes,ScreenParamList } from './ScreenTypes';
import Home from '../../Screens/Home/Home';

const Stack = createStackNavigator<ScreenParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenTypes.SignIn}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >

      {/* Auth Screens */}
      <Stack.Screen name={ScreenTypes.SignIn} component={SignIn} />


      {/* Home Screens */}
      <Stack.Screen name={ScreenTypes.Home} component={Home} />
    </Stack.Navigator>
  );
};
export default StackNavigation;
