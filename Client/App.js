import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTabs } from './src/component/BotNavigation';
import HomeScreen from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import client from './src/config/apolloClient';
import DetailNews from './src/component/Detail';
import { CardNewsByCategory, Search } from './src/component/Search';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='HOMEPAGE' component={MyTabs} />
              <Stack.Screen name="JHN" component={HomeScreen} />
              <Stack.Screen name="Detail" component={DetailNews} />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({
})
