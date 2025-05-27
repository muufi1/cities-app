// HeaderIconButton.tsx

import { IconButton } from "react-native-paper";

interface Props {
  iconName: string;
  onPress: () => void;
}

export const HeaderIconButton: React.FC<Props> = ({iconName, onPress}) => {
  return(
    <IconButton 
      icon={iconName}
      onPress={onPress}
    />
  );
};
