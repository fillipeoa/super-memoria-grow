import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Icon } from 'react-native-elements'
import * as Speech from 'expo-speech';
import { CHAT_GPT_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Story = ({ navigation }) => {

    const [text, setText] = useState([]);
    const [phrase, setPhrase] = useState('');
    const [index, setIndex] = useState(0);

    const [loaded_font] = useFonts({
        'MontserratRegular': Montserrat_400Regular,
        'MontserratBold': Montserrat_700Bold
    });
    
    useEffect(() => {
        const generateText = async () => {
            try {
                let target_child_age = 2;
                
                let stored_words = await AsyncStorage.getItem('wordItems');
                stored_words = JSON.parse(stored_words);

                if(!stored_words || stored_words.length == 0){
                    setPhrase('Adicione pelo menos uma palavra para começar.')
                    return;
                }

                let randomly_selected_words = stored_words.sort(() => Math.random() - 0.5).slice(0, 5);

                let prompt = `Crie uma história para uma criança de ${target_child_age} anos com os seguintes elemetos: `;
                for(let word of randomly_selected_words){
                    prompt += `${word}, `;
                }
                prompt = prompt.slice(0, -2);
                prompt += `. Em hipótese alguma o parágrafo pode ter mais de 10 palavras.`;
        
                const response = await fetch("https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions", {
                    method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${CHAT_GPT_API_KEY}`
                    },
                    body: JSON.stringify({
                    prompt,
                    temperature: 0.22,
                    max_tokens: 500,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    }),
                });
        
                const data = await response.json();
                let text = data.choices[0].text.slice(2).split('\n');
                
                setText(text);
                setIndex(0);
                setPhrase(text[0]);
                Speech.stop();
                Speech.speak(text[0], {language: 'pt-BR'});
            } catch (error) {
                console.error('Erro na requisição:', error);
                setPhrase('Erro ao gerar história :(');
            }
        };

        generateText();
    }, []); 
  
    if(!loaded_font){
        return <View></View>;
    }
    
    const handleArrowPress = (direction) => {
        if (direction === 'previous') {
            setPhrase(text[index - 1]);
            setIndex(index - 1);
            Speech.stop();
            Speech.speak(text[index - 1], { language: 'pt-BR' });
        } else if (direction === 'next') {
            setPhrase(text[index + 1]);
            setIndex(index + 1);
            Speech.stop();
            Speech.speak(text[index + 1], { language: 'pt-BR' });
        }
    };
    
    const isItFirstIndex = () => {
        return text.length === 0 || index === 0;
    };
    
    const isItLastIndex = () => {
        return text.length === 0 || index === text.length - 1;
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={isItFirstIndex() ? styles.button_previous_disabled : styles.button_previous}
                disabled={isItFirstIndex()}
                onPress={() => handleArrowPress('previous')}
            >
                <Icon name="chevron-left" size={30} color="#002057" />
            </TouchableOpacity>

            <Text
                style={styles.phrase}
            > { phrase } </Text>

            <TouchableOpacity
                style={isItLastIndex() ? styles.button_next_disabled : styles.button_next}
                disabled={isItLastIndex()}
                onPress={() => handleArrowPress('next')}
            >
                <Icon
                    name="chevron-right"
                    size={30}
                    color="#e1be34"
                />
            </TouchableOpacity>
        </View>
    );
  };
  
  export { Story };
  
  const styles = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      padding: 30
    },
  
    phrase: {
      fontSize: 30,
      fontFamily: 'MontserratRegular',
      marginTop: 40,
      textAlign: 'center',
      color: '#002057'
    },

    button_next: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:120,
        backgroundColor:'#002057',
        borderRadius:120,
        marginTop: 50
    },

    button_next_disabled: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:120,
        backgroundColor:'#002057',
        borderRadius:120,
        marginTop: 50,
        opacity: 0.3
    },

    button_previous: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#e1be34',
        borderRadius:50,
        marginTop: 40
    },

    button_previous_disabled: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#e1be34',
        borderRadius:50,
        marginTop: 40,
        opacity: 0.3
    }
  });