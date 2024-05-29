import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import { useCallback, useState } from 'react';
import Colors from './constants/colors';
import GameOver from './screens/GameOver';
import { useFonts } from 'expo-font';
export { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [rounds, setRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  let screen = <StartGameScreen onConfirmNumber={pickUserNumber} />;

  function pickUserNumber(number) {
    setUserNumber(number);
    setIsGameOver(false);
  }

  function handleGameOver(numberOfRounds) {
    setIsGameOver(true);
    setRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setRounds(0);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        roundsNumber={rounds}
        onStartNumber={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.background}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  background: {
    opacity: 0.15,
  },
});
