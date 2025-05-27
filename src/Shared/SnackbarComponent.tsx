// Snackbar.tsx

import { Snackbar, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const { colors } = useTheme();

interface Props {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export const SnackbarComponent: React.FC<Props> = ({message, visible, onDismiss}) => {
  return (
    <Snackbar
      visible={visible}
      duration={1500}
      style={styles.snackbarStyle}
      onDismiss={onDismiss}
    >
      <View style={styles.snackbarContent}>
        <Text 
          style={[styles.snackbarText, {color: colors.onPrimary}]}
        >
          {message}
        </Text>
      </View>
    </Snackbar>
  )
};

const styles = StyleSheet.create({
  snackbarStyle: {
    width: '100%',
    borderRadius: 16,
    margin: 10,
    alignSelf: 'center',
  },
  snackbarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbarText: {
    textAlign: 'center',
  },
});
