import { Alert } from "react-native";

const showAlert = (message, proceed, screen) => {
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

export { showAlert };
