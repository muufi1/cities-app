// LocationsScreen.tsx

import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { LocationsScreenNavigationProp, LocationsScreenProps } from "../../App";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useLayoutEffect, useMemo } from "react";
import { HeaderIconButton } from "../Shared/HeaderIconButton";
import CitiesContext from "../Context/CitiesContext";
import { LocationListItem } from "./LocationListItem";
import { t } from "i18next";

export const LocationsScreen: React.FC<LocationsScreenProps> = ({route}) => {
  
  const navigation = useNavigation<LocationsScreenNavigationProp>();
  const { allCities, removeLocation } = useContext(CitiesContext);
  const city = route.params.city;
  const { colors } = useTheme();

  let cityIdx = allCities.findIndex((item) => item.id === city.id);

  const headerLeft = useMemo(() => (
    <HeaderIconButton 
      iconName="arrow-left"
      onPress={() => {
        navigation.navigate('CitiesScreen');
      }}
    />
  ), [navigation]);

  const headerRight = useMemo(() => (
    <HeaderIconButton 
      iconName="plus"
      onPress={() => {
        navigation.navigate('AddLocationScreen', {
          mode: 'add', 
          city: city,
          location: null,
        });
      }}
    />
  ), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('LocationsInCityTitle', {name: city.name}),
      headerLeft: () => headerLeft,
      headerRight: () => headerRight,
    });
  }, [navigation, headerLeft, headerRight]);

  // console.log(`LocationsScreen route is ${JSON.stringify(route)}`);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Surface style={styles.surface}>
        <FlatList
          data={allCities[cityIdx].locations}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          ListEmptyComponent={
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{t('YouDontHaveLocations')}</Text>
            </View>
          }
          renderItem={({item}) => (
            <LocationListItem
              locationItem={item}
              city={city}
              onPress={() => {}}
              onLongPress={() => navigation.navigate(
                'AddLocationScreen', 
                {mode: 'edit', city: city, location: item}
              )}
              onRemove={() => removeLocation(city, item.id)}
            />
          )}></FlatList>
      </Surface>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentUpper: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLower: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
    margin: 10,
    padding: 10,
  },
  listItem: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: 16,
  },
})

