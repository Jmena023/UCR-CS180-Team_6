import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Fredoka_600SemiBold } from "@expo-google-fonts/fredoka";
import {
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { ActivityIndicator, View } from "react-native";
import { GameProvider } from "../game/context";
export default function Layout() {
  const [loaded, error] = useFonts({
    Fredoka_600SemiBold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });
  if (!loaded && !error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF7E5",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#123D2A" />
      </View>
    );
  return (
    <GameProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFF7E5" },
          animation: "slide_from_right",
        }}
      />
    </GameProvider>
  );
}
