import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigator from './nigation/drawernav';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.appContainer}>
            <DrawerNavigator />
          </View>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appContainer: {
    flex: 1,
  },
});

export default App;
