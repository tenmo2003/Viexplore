import { Alert } from "react-native";

const showAlert = (message, proceed, screen, navigation) => {
  Alert.alert(
    "Alert",
    message,
    [
      {
        text: "OK",
        onPress: () => proceed && navigation.navigate(screen),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () => proceed && navigation.navigate(screen),
    }
  );
};

export const actionAlert = (message, action) => {
  Alert.alert(
    "Alert",
    message,
    [
      {
        text: "OK",
        onPress: () => action(),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
}

export { showAlert };
