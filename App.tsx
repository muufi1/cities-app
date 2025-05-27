/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// $ react-native start
// $ react-native run-android

import React from 'react';

import { CityItem } from './src/Shared/CityItem';
import { 
  createStackNavigator, 
  StackNavigationProp, 
  StackScreenProps 
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { CitiesScreen } from './src/CitiesScreen/CitiesScreen';
import { AddCityScreen } from './src/AddCityScreen/AddCityScreen';
import { LocationsScreen } from './src/LocationScreen/LocationsScreen';
import { InfoScreen } from './src/InfoScreen/InfoScreen';
import CitiesProvider from './src/Context/CitiesProvider';
import { AddLocationScreen } from './src/AddLocationScreen/AddLocationScreen';
import { LocationItem } from './src/Shared/LocationItem';
import { useTheme } from 'react-native-paper';

// navigation routes parameters
type RootStackParamList = {
  CitiesScreen: undefined; // no parameters for Home screen
  AddCityScreen: {mode: string, city: CityItem | null}; 
  LocationsScreen: {city: CityItem};
  AddLocationScreen: {mode: string, city: CityItem, location: LocationItem | null} 
  InfoScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// define screen component props
export type CitiesScreenProps = StackScreenProps<RootStackParamList, 'CitiesScreen'>;
export type AddCityScreenProps = StackScreenProps<RootStackParamList, 'AddCityScreen'>;
export type LocationsScreenProps = StackScreenProps<RootStackParamList, 'LocationsScreen'>;
export type AddLocationScreenProps = StackScreenProps<RootStackParamList, 'AddLocationScreen'>;
export type InfoScreenProps = StackScreenProps<RootStackParamList, 'InfoScreen'>;

// define screen navigation props
export type CitiesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CitiesScreen'>;
export type AddCityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddCityScreen'>;
export type LocationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LocationsScreen'>;
export type AddLocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddLocationScreen'>;
export type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoScreen'>;

function App(): React.JSX.Element {

  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <CitiesProvider>
        <Stack.Navigator 
          initialRouteName='CitiesScreen'
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: colors.primary,
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
          >
          <Stack.Screen 
            name='CitiesScreen'
            component={CitiesScreen}
          />
          <Stack.Screen 
            name='AddCityScreen'
            component={AddCityScreen}
          />
          <Stack.Screen 
            name='LocationsScreen'
            component={LocationsScreen}
          />
          <Stack.Screen
            name='AddLocationScreen'
            component={AddLocationScreen}
          />
          <Stack.Screen 
            name='InfoScreen'
            component={InfoScreen}
          />
        </Stack.Navigator>
      </CitiesProvider>
    </NavigationContainer>
  );
}

export default App;
