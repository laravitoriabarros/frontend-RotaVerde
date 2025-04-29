import { useEffect, useRef } from 'react';
import { Animated, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Index() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // fadeout
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // duração do fadeout 0.8 segundos
        useNativeDriver: true,
      }).start(() => {
        router.replace('/pagina-decisao-inicial');
      });
    }, 2000); // espera 2 segundos antes de começar o fade

    return () => clearTimeout(timeout);
  }, [fadeAnim, router]);

  return (
    <View style={tw`flex-1`}>
      <Animated.View style={[tw`flex-1`, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/images/entrada.png')}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}
