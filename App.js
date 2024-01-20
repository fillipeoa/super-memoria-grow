import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from "./src/screens/Home.js";
import { Story } from "./src/screens/Story.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Super Memória">
        <Stack.Screen name="Super Memória" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="História" component={Story} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
