import { useEffect, useState } from 'react';
import { Dimensions, PixelRatio } from 'react-native';

export const useResponsive = () => {
    const [screenWidth, setScreenWidth] = useState<number>(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState<number>(Dimensions.get('window').height);
    const [isPortrait, setIsPortrait] = useState<boolean>(Dimensions.get('window').height >= Dimensions.get('window').width);


    const wp = (width: number) => {
        // Use PixelRatio.roundToNearestPixel method in order to round the layout
        // size (dp) to the nearest one that correspons to an integer number of pixels.
        return PixelRatio.roundToNearestPixel((screenWidth * width) / 100);
    };

    const hp = (height: number) => {
        // Use PixelRatio.roundToNearestPixel method in order to round the layout
        // size (dp) to the nearest one that correspons to an integer number of pixels.
        return PixelRatio.roundToNearestPixel((screenHeight * height) / 100);
    };


    useEffect(() => {
        const event_listner = Dimensions.addEventListener('change', newDimensions => {
            // Retrieve and save new dimensions
            const curr_screen_width = newDimensions.window.width;
            const curr_screen_height = newDimensions.window.height;

            setScreenWidth(curr_screen_width);
            setScreenHeight(curr_screen_height);
            setIsPortrait(curr_screen_height >= curr_screen_width);
        });
        return () => event_listner.remove();
    }, []);

    return { wp, hp, isPortrait, screenWidth, screenHeight };
};
