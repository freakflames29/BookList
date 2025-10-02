import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../Screens/Auth/SignIn';
import { ScreenTypes,ScreenParamList } from './ScreenTypes';

const Stack = createStackNavigator<ScreenParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenTypes.SignIn}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name={ScreenTypes.SignIn} component={SignIn} />
    </Stack.Navigator>
  );
};
export default StackNavigation;
