import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FontsVariant from './src/utils/FontsVariant';
import SignIn from './src/Screens/Auth/SignIn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NavigationContainerWrapper from './src/Adapter/Navigation/NavigationContainerWrapper';
import { Provider } from 'react-redux';
import { store } from './src/Adapter/Redux/Store';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'dark-content'}
            translucent={true}
            backgroundColor={'#fff'}
          />
          <NavigationContainerWrapper />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
