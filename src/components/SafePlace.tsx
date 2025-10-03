import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafePlaceProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
};

const SafePlace: React.FC<SafePlaceProps> = ({
  style,
  children,
  top,
  bottom,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          marginTop: top ? insets.top : 0,
          marginBottom: bottom ? insets.bottom : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default SafePlace;
