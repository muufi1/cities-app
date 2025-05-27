// CitiesProvider.tsx

import { ReactNode, useEffect, useState } from "react";
import { CityItem, testCities } from "../Shared/CityItem";
import { LocationItem } from "../Shared/LocationItem";
import CitiesContext from "./CitiesContext";
import { Alert, StyleSheet, View } from "react-native";
import uuid from 'react-native-uuid';
import { t } from "i18next";
import NativeLocalStorage from '../../specs/NativeLocalStorage';

interface Props {
  children: ReactNode;
}

const CitiesProvider: React.FC<Props> = ({children}) => {
  const storageKey = 'cities';
  const [cities, setCities] = useState<CityItem[]>(() => {
    // get data from local storage if available
    const item = JSON.parse(NativeLocalStorage?.getItem(storageKey) ?? 'null');
    return (item as CityItem[]) || testCities;
  });
  // function saveCities () {
  //   NativeLocalStorage?.setItem(JSON.stringify(cities), storageKey);
  // }
  // keep data up to date
  useEffect(() => {
    // saveCities();
    NativeLocalStorage?.setItem(JSON.stringify(cities), storageKey);
  }, [cities]);

  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>(t('SomethingWentWrong'));
  // console.log(`CitiesProvider ${JSON.stringify(cities)}`);
  
  return (
    <CitiesContext.Provider value={{
      allCities: cities,
      addCity: (name: string, country: string) => {
        // console.log(`addCity called with ${name} and ${country}`);
        let idx = cities.findIndex((item) => item.name === name && item.country === country);
        if (idx >= 0) {
          setSnackbarMessage(t('CityInCountryExists', {city: name, country: country}));
          setSnackbarVisible(true);
          return;
        }
        setCities((prevCities) => [
          {
            name: name,
            country: country,
            id: uuid.v4(),
            locations: [],
          }, ...prevCities
        ]);
        // saveCities();
      },
      editCity: (id: string, name: string, country: string) => {
        let idx = cities.findIndex((item) => item.id === id);
        if (idx < 0) {
          Alert.alert(`Error! City id ${id} invalid`);
          return;
        } else {
          // keep the locations
          let locations = cities[idx].locations;
          // remove old data
          setCities((prevCities) => prevCities.filter((city) => city.id !== id));
          // save data with updated name and country
          setCities((prevCities) => [
            {
              name: name,
              country: country,
              id: id,
              locations: locations,
            }, ...prevCities
          ]);
          // saveCities();
        }
      },
      removeCity: (id: string) => {
        setCities((prevCities) => prevCities.filter((city) => city.id !== id));
        // saveCities();
      },
      addLocation: (city: CityItem, name: string, info: string) => {
        // console.log(`addLocation called with ${name} and ${info}`);
        let idx = cities.findIndex((item) => item.id === city.id);
        if (idx < 0) {
          Alert.alert(`Error! City id ${city.id} invalid`);
          return;
        } else {
          // update the locations
          let locations = [ 
            {
              name: name,
              info: info,
              id: uuid.v4(),
            }, 
            ...cities[idx].locations
          ];
          // remove old data
          setCities((prevCities) => prevCities.filter((item) => item.id !== city.id));
          // save data with updated locations
          setCities((prevCities) => [
            {
              name: city.name,
              country: city.country,
              id: city.id,
              locations: locations,
            }, ...prevCities]
          );
          // saveCities();
        }
      },
      editLocation: (city: CityItem, id: string, name: string, info: string) => {
        // console.log(`addLocation called with ${name} and ${info}`);
        let idx = cities.findIndex((item) => item.id === city.id);
        if (idx < 0) {
          Alert.alert(`Error! City id ${city.id} invalid`);
          return;
        } else {
          // read locations and remove old data
          let locations =  cities[idx].locations.filter((item) => item.id !== id);
          // remove old city data
          setCities((prevCities) => prevCities.filter((item) => item.id !== city.id));
          // save data with updated locations
          setCities((prevCities) => [
            {
              name: city.name,
              country: city.country,
              id: city.id,
              locations: [
                {
                name: name,
                info: info,
                id: id,
                }, 
              ...locations
              ],
            }, ...prevCities]
          );
          // saveCities();
        }
      },
      removeLocation: (city: CityItem, id: string) => {
        let idx = cities.findIndex((item) => item.id === city.id);
        if (idx < 0) {
          Alert.alert(`Error! City id ${city.id} invalid`);
          return;
        } else {
          // update the locations
          let locations =  cities[idx].locations.filter((item) => item.id !== id);
          // remove old data
          setCities((prevCities) => prevCities.filter((item) => item.id !== city.id));
          // save data with updated locations
          setCities((prevCities) => [
            {
              name: city.name,
              country: city.country,
              id: city.id,
              locations: locations,
            }, ...prevCities]
          );
          // saveCities();
        }
      },
    }}>
      {children}
    </CitiesContext.Provider>
  )
};

const styles = StyleSheet.create({
  contentLower: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CitiesProvider;
