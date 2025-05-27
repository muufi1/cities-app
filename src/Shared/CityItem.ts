// CityItem.ts

import { LocationItem } from "./LocationItem";
import uuid from 'react-native-uuid';

export type CityItem = {
  id: string;
  name: string;
  country: string;
  locations: LocationItem[];
};

const testLahti: CityItem = {
  name: 'Lahti', 
  country: 'fi',
  id: uuid.v4(),
  locations: [
    {
      name: 'Ski Jumping Tower',
      info: 'Nice view over the lakes',
      id: uuid.v4(),
    },
    {
      name: 'Sibelius Hall',
      info: 'Great concert hall',
      id: uuid.v4(),
    },
  ],
};

const testHeinola: CityItem = {
  name: 'Heinola', 
  country: 'fi',
  id: uuid.v4(),
  locations: [
    {
      name: 'Bridge',
      info: 'Nice view over the lakes',
      id: uuid.v4(),
    },
    {
      name: 'Ice Hall',
      info: 'Home arena of Peliitat',
      id: uuid.v4(),
    },
  ],
};

export const testCities: CityItem[] = [
  testLahti,
  testHeinola,
];
