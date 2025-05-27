// CityListItem.tsx

import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CityItem } from "../Shared/CityItem";
import { Avatar, Card, useTheme } from "react-native-paper";

import emojiFlags from 'emoji-flags';

interface Props {
  cityItem: CityItem;
  onPress: () => void;
  onLongPress: () => void;
  onRemove: () => void;
}

interface LeftContentProps {
  countryCodeEmoji: string;
}

interface RightContentProps {
  iconName: string;
  onPress: () => void;
}

const LeftContent: React.FC<LeftContentProps> = ({countryCodeEmoji}) => {
  return (
    <TouchableOpacity>
      <Text style={{fontSize: 24}}>{countryCodeEmoji}</Text>
    </TouchableOpacity>
  );
}

const RightContent: React.FC<RightContentProps> = ({iconName, onPress}) => {
  return (
    <TouchableOpacity style={styles.rightIcon} onPress={onPress}>
      <Avatar.Icon size={32} icon={iconName}/>
    </TouchableOpacity>
  );
}

export const CityListItem: React.FC<Props> = ({cityItem, onPress, onLongPress,onRemove}) => {
  const { colors } = useTheme();
  const removeIconName = 'delete';
  
  let countryCodeEmoji = '';
  if (emojiFlags[cityItem.country.toUpperCase()]) {
    countryCodeEmoji = emojiFlags[cityItem.country.toUpperCase()].emoji;
  } else {
    countryCodeEmoji = 'zz';
  }

  // memorized leftContent to prevent re-renders
  const renderLeftContent = useCallback((props) => (
    <LeftContent {...props} countryCodeEmoji={countryCodeEmoji}/>),
    [countryCodeEmoji]
  );

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
          title={cityItem.name}
          subtitle={`Country: ${cityItem.country}`}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          left={renderLeftContent}
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
    // ToDo: needed?
  },
  subtitleStyle: {
    fontSize: 12,
  },
  rightIcon: {
    margin: 10,
  },
})
