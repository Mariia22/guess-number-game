import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/Button';

function GameOver({ roundsNumber, userNumber, onStartNumber }) {
  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNumber}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary800,
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
});
