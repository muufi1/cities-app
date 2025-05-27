// CitiesContext.tsx

import React from "react";
import { CityItem, testCities } from "../Shared/CityItem";

export interface iCitiesContext {
  allCities: CityItem[];
  addCity: (name: string, country: string) => void;
  editCity: (id: string, name: string, country: string) => void;
  removeCity: (id: string) => void;
  addLocation: (city: CityItem, name: string, info: string) => void;
  editLocation: (city: CityItem, id: string, name: string, info: string) => void;
  removeLocation: (city: CityItem, id: string) => void;
}

const defaultTestState = {
  allCities: testCities,
  addCity: (name: string, country: string) => {},
  editCity: (id: string, name: string, country: string) => {},
  removeCity: (id: string) => {},
  addLocation: (city: CityItem, name: string, info: string) => {},
  editLocation: (city: CityItem, id: string, name: string, info: string) => {},
  removeLocation: (city: CityItem, id: string) => {},
};

const defaultEmptyState = {
  allCities: [],
  addCity: (name: string, country: string) => {},
  editCity: (id: string, name: string, country: string) => {},
  removeCity: (id: string) => {},
  addLocation: (city: CityItem, name: string, info: string) => {},
  editLocation: (city: CityItem, id: string, name: string, info: string) => {},
  removeLocation: (city: CityItem, id: string) => {},
};

// for testing
const CitiesContext = React.createContext<iCitiesContext>(defaultTestState);

// for production
// const CitiesContext = React.createContext<iCitiesContext>(defaultEmptyState);

export default CitiesContext;
