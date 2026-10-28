import { useLocalSearchParams } from "expo-router";
import { Screens } from "../screens";
export default function Screen() {
  const { page } = useLocalSearchParams<{ page: string }>();
  return <Screens screen={page} />;
}
