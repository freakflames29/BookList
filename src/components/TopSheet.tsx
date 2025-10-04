import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

type TopSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const TopSheet: React.FC<TopSheetProps> = ({ visible, onClose, children }) => {
  const translateY = useSharedValue(-height);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0,);
      backdropOpacity.value = withTiming(0.5);
    } else {
      translateY.value = withTiming(-height, { duration: 400 });
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <>
      {/* Background dim layer */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.backdrop, backdropStyle]}
          pointerEvents={visible ? 'auto' : 'none'}
        />
      </TouchableWithoutFeedback>

      {/* The top sheet itself */}
      <Animated.View style={[styles.sheetContainer, sheetStyle]}>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1,
  },
  sheetContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    zIndex: 2,
    elevation: 10,
  },
});

export default TopSheet;
