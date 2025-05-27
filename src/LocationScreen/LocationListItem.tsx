// LocationListItem.tsx

import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card, useTheme } from "react-native-paper";
import { LocationItem } from '../Shared/LocationItem';
import { CityItem } from '../Shared/CityItem';

interface Props {
  locationItem: LocationItem;
  city: CityItem;
  onPress: () => void;
  onLongPress: () => void;
  onRemove: () => void;
}

// interface LeftContentProps {
// }

interface RightContentProps {
  iconName: string;
  onPress: () => void;
}

// const LeftContent: React.FC<LeftContentProps> = () => {
//   return (
//     <TouchableOpacity>
//       <Text style={{fontSize: 24}}>{
//         //
//         }</Text>
//     </TouchableOpacity>
//   );
// }

const RightContent: React.FC<RightContentProps> = ({iconName, onPress}) => {
  return (
    <TouchableOpacity style={styles.rightIcon} onPress={onPress}>
      <Avatar.Icon size={32} icon={iconName}/>
    </TouchableOpacity>
  );
}

export const LocationListItem: React.FC<Props> = ({
  locationItem, city, onPress, onLongPress, onRemove
}) => {
  const { colors } = useTheme();
  const removeIconName = 'delete';

  const renderRightContent = useCallback((props) => (
    <RightContent {...props} iconName={removeIconName} onPress={() => onRemove()}/>),
    [onRemove]
  );

  return (
    <View style={styles.cardContainer}>
      <Card style={[styles.card, {backgroundColor: colors.background}]}
        onPress={() => {onPress();}}
        onLongPress={() => {onLongPress();}}
      >
        <Card.Title
          title={locationItem.name}
          subtitle={`City: ${city?.name}`} 
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          right={renderRightContent}
        />
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  titleStyle: {
  },
  subtitleStyle: {
    fontSize: 12,
  },
  rightIcon: {
    margin: 10,
  },
})
