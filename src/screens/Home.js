import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import logo from '../../assets/super-memoria.png';
import background from '../../assets/background.png';
import * as Speech from 'expo-speech';

const Home = ({ navigation }) => {

  const [loaded_font] = useFonts({
    'MontserratRegular': Montserrat_400Regular,
    'MontserratBold': Montserrat_700Bold
  })

  if(!loaded_font){
    return <View></View>;
  }

  Speech.stop();

  return (
      <ImageBackground
        source={background} 
        style={styles.background_image}
      > 
        <View
          style={styles.container}
        >
          <Image
            source={logo}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.main_button}
            onPress={() => navigation.navigate('História')}
          >
              <Text 
                style={styles.texto_main_button}
              > Criar uma História</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondary_button}
            onPress={() => navigation.navigate('História')}
          >
              <Text
                style={styles.texto_secondary_button}
              > Adicionar palavras</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}

export { Home };


const styles = StyleSheet.create({
  background_image: {
    width: '100%',
    height: '100%',
    flex: 1
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 300,
    marginTop: 50,
  },

  main_button: {
    width: '70%',
    marginTop: 40,
    backgroundColor: "#e1be34",
    padding: 25,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  secondary_button: {
    width: '70%',
    marginTop: 20,
    backgroundColor: "#080c85",
    padding: 25,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  texto_main_button: {
    color: '#002057',
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 24
  },

  texto_secondary_button: {
    color: '#696ef5',
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
    fontSize: 24
  }
});