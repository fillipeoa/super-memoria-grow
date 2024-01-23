import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import background from '../../assets/background.png';

const Words = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('wordItems');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  const saveItems = async (updatedItems) => {
    try {
      await AsyncStorage.setItem('wordItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Erro ao salvar itens:', error);
    }
  };

  const addItem = () => {
    if (newItem.trim() !== '') {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveItems(updatedItems);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const renderTwoItemsPerRow = ({ item, index }) => {
    const isFirstItem = index % 2 === 0;
    const itemStyle = isFirstItem ? styles.list_item_left : styles.list_item_right;

    return (
      <View style={itemStyle}>
        <Text style={styles.text_list_items}>{item}</Text>
        <TouchableOpacity onPress={() => removeItem(index)} style={styles.deleteIcon}>
          <Icon name="delete" color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const buttonStyle = newItem == '' ? styles.addButtonDisabled : styles.addButton;

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma palavra"
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
        />
        <TouchableOpacity style={buttonStyle} onPress={addItem}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTwoItemsPerRow}
          numColumns={2}
          style={styles.list}
        />
      </View>
    </ImageBackground>
  );
};

const commonListItemStyles = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#080c85',
  borderRadius: 10,
  marginBottom: 10,
  height: 110,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.8,
  elevation: 6,
  shadowRadius: 15,
  shadowOffset: { width: 1, height: 13 },
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 25,
  },

  input: {
    height: 60,
    borderColor: 'gray',
    color: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 20,
  },

  addButton: {
    backgroundColor: '#e1be34',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 40,
  },

  addButtonDisabled: {
    backgroundColor: '#e1be34',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 40,
    opacity: 0.5
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
  },

  list: {
    flex: 1,
  },

  list_item_left: {
    ...commonListItemStyles,
    marginRight: 5,
    maxWidth: '50%',
  },

  list_item_right: {
    ...commonListItemStyles,
    marginLeft: 5,
  },

  text_list_items: {
    color: '#fff',
    fontSize: 20,
  },

  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 25,
    backgroundColor: 'red',
    padding: 5,
  },
});

export { Words };
