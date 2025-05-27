// CitiesScreen.tsx

import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { CitiesScreenNavigationProp, CitiesScreenProps } from "../../App";
import React, { useContext, useLayoutEffect, useMemo } from "react";
import { HeaderIconButton } from "../Shared/HeaderIconButton";
import CitiesContext from "../Context/CitiesContext";
import { CityListItem } from "./CityListItem";
import { useTranslation } from "react-i18next";

export const CitiesScreen: React.FC<CitiesScreenProps> = ({route}) => {

  const navigation = useNavigation<CitiesScreenNavigationProp>();
  const { allCities, removeCity } = useContext(CitiesContext);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const headerLeft = useMemo(() => (
    <HeaderIconButton 
      iconName="cog"
      onPress={() => navigation.navigate('InfoScreen')}
    />
  ), [navigation]);

  const headerRight = useMemo(() => (
    <HeaderIconButton 
      iconName="plus"
      onPress={() => {
        navigation.navigate('AddCityScreen', {
          mode: 'add', 
          city: null,
        });
      }}
    />
  ), [navigation]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('CitiesAppTitle'),
      headerLeft: () => headerLeft,
      headerRight: () => headerRight,
    });
  }, [navigation, headerLeft, headerRight]);

  console.log(`CitiesScreen with ${JSON.stringify(allCities)}`);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
     <Surface style={styles.surface}>
      <FlatList
        data={allCities}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        ListEmptyComponent={
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{t('YouDontHaveCities')}</Text>
          </View>
        }
        renderItem={({item}) => (
          <CityListItem
            cityItem={item}
            onPress={() => navigation.navigate('LocationsScreen', {city: item})}
            onLongPress={() => navigation.navigate('AddCityScreen', {mode: 'edit', city: item})}
            onRemove={() => removeCity(item.id)}
          />
        )}
      ></FlatList>
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
  surface: {
    width: '100%',
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
  button: {
    marginVertical: 5, // adds vertical spacing between buttons
    // optionally, add horizonta margins too if needed
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
