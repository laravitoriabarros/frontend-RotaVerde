import { useEffect, useRef } from 'react';
import { Animated, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

interface LoadingSplashProps {
  onAnimationFinish: () => void
}

export function LoadingSplash({ onAnimationFinish }: LoadingSplashProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // 0.8 seconds
        useNativeDriver: true,
      }).start(() => {
        onAnimationFinish()
      });
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, [fadeAnim, onAnimationFinish]);

  return (
    <View style={tw`flex-1`}>
      <Animated.View style={[tw`flex-1`, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/images/entrada.png')}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}
