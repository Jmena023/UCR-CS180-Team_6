import { useSyncExternalStore } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
const subscribe = () => () => {};
export function useColorScheme() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const scheme = useRNColorScheme();
  return hydrated ? scheme : "light";
}
