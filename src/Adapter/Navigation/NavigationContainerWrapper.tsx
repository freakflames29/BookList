import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';

const NavigationContainerWrapper = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;