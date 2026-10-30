import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import { C, F } from "./theme";
export type IconName = React.ComponentProps<typeof Feather>["name"];
export const Heart = ({ filled }: { filled: boolean }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path
      d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
      fill={filled ? C.error : "none"}
      stroke={filled ? C.error : C.muted}
      strokeWidth={2}
    />
  </Svg>
);
export const Icon = ({
  name,
  size = 22,
  color = C.green,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) => <Feather name={name} size={size} color={color} />;
export function Button({
  title,
  onPress,
  secondary,
  disabled,
  loading,
  icon,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        (disabled || loading) && { opacity: 0.5 },
        pressed && {
          transform: [{ translateY: 3 }],
          boxShadow: "0px 0px 0px #123D2A",
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={C.green} />
      ) : icon ? (
        <Icon name={icon} size={19} />
      ) : null}
      <Text style={s.buttonText}>{title}</Text>
    </Pressable>
  );
}
export function IconButton({
  name,
  onPress,
  label,
}: {
  name: IconName;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={s.iconButton}
    >
      <Icon name={name} />
    </Pressable>
  );
}
export const Title = ({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) => (
  <Text accessibilityRole="header" style={[s.title, small && { fontSize: 25 }]}>
    {children}
  </Text>
);
export const Body = ({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <Text style={[s.body, center && { textAlign: "center" }]}>{children}</Text>
);
export const Label = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.label}>{children}</Text>
);
export const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => <View style={[s.card, style]}>{children}</View>;
export function Field({
  label,
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: "email-address" | "default";
}) {
  return (
    <View style={{ gap: 8 }}>
      <Label>{label}</Label>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        autoCapitalize="none"
        keyboardType={keyboardType}
        style={s.input}
      />
    </View>
  );
}
export const Wordmark = ({
  large = false,
  width,
}: {
  large?: boolean;
  width?: number;
}) => (
  <Image
    source={require("../../assets/ihunt Logo.png")}
    accessibilityLabel="iHunt"
    resizeMode="contain"
    style={{
      width: width ?? (large ? 310 : 142),
      height: width ? width * 0.356 : large ? 112 : 51,
    }}
  />
);
export function Avatar({
  name,
  color = C.yellow,
  size = 42,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  return (
    <View
      accessibilityLabel={name}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        borderWidth: 2,
        borderColor: C.green,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontFamily: F.title, color: C.green, fontSize: size * 0.43 }}
      >
        {name.slice(0, 1)}
      </Text>
    </View>
  );
}
export function Art({
  mode,
  large = false,
  compact = false,
}: {
  mode: "album" | "live" | "battle";
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <Svg
      width={large ? 220 : compact ? 92 : 126}
      height={large ? 170 : compact ? 85 : 125}
      viewBox="0 0 160 140"
    >
      <Ellipse cx="85" cy="120" rx="57" ry="9" fill={C.green} opacity=".12" />
      <Path
        d="M126 99 Q147 67 137 34 Q109 54 126 99 M23 103 Q1 77 12 49 Q37 64 23 103"
        fill={C.green}
        opacity=".8"
      />
      {mode === "live" ? (
        <>
          <Rect
            x="32"
            y="45"
            width="100"
            height="68"
            rx="18"
            fill={C.cream}
            stroke={C.green}
            strokeWidth="3"
          />
          <Path
            d="M60 44 L65 31 L94 31 L100 44"
            fill={C.orange}
            stroke={C.green}
            strokeWidth="3"
          />
          <Circle cx="82" cy="78" r="25" fill={C.green} />
          <Circle cx="82" cy="78" r="17" fill={C.leaf} />
          <Circle cx="87" cy="72" r="6" fill={C.cream} />
          <Circle cx="116" cy="58" r="4" fill={C.orange} />
        </>
      ) : (
        <>
          <Rect
            x="27"
            y="25"
            width="80"
            height="99"
            rx="5"
            fill={mode === "battle" ? C.orange : C.leaf}
            stroke={C.green}
            strokeWidth="3"
            transform="rotate(-13 67 74)"
          />
          <Rect
            x="57"
            y="26"
            width="78"
            height="100"
            rx="5"
            fill={C.cream}
            stroke={C.green}
            strokeWidth="3"
            transform="rotate(12 95 76)"
          />
          <Rect
            x="65"
            y="38"
            width="62"
            height="63"
            rx="2"
            fill={mode === "battle" ? "#BAD5DD" : "#D9E5B2"}
            transform="rotate(12 95 76)"
          />
          <Path d="M65 88 L84 61 L97 82 L111 68 L124 102 Z" fill={C.green} />
          <Circle cx="108" cy="51" r="9" fill={C.orange} />
          <Path
            d="M35 27 L40 15 M24 34 L12 29 M47 18 L54 9"
            stroke={C.green}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      <Path
        d="M137 15 L140 25 L151 28 L141 32 L138 43 L134 32 L123 29 L133 25 Z"
        fill={C.yellow}
        stroke={C.green}
        strokeWidth="2"
      />
    </Svg>
  );
}
export function Photo({ uri, height = 180 }: { uri: string; height?: number }) {
  return (
    <Image
      accessibilityLabel="Photo entry"
      source={{ uri }}
      style={{
        width: "100%",
        height,
        borderRadius: 12,
        backgroundColor: C.pale,
      }}
      resizeMode="cover"
    />
  );
}
export const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  spread: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontFamily: F.title,
    fontSize: 36,
    lineHeight: 40,
    color: C.green,
    letterSpacing: -0.7,
  },
  body: { fontFamily: F.body, color: C.muted, fontSize: 14, lineHeight: 22 },
  label: {
    fontFamily: F.bold,
    fontSize: 12,
    color: C.green,
    letterSpacing: 0.6,
  },
  button: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: C.green,
    backgroundColor: C.orange,
    boxShadow: "0px 3px 0px #123D2A",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: C.cream,
    boxShadow: "0px 0px 0px #123D2A",
    borderColor: C.line,
  },
  buttonText: { fontFamily: F.bold, color: C.green, fontSize: 14 },
  iconButton: {
    minWidth: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
  },
  card: {
    backgroundColor: C.white,
    borderRadius: 22,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: C.line,
  },
  input: {
    minHeight: 54,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: C.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontFamily: F.body,
    color: C.green,
    fontSize: 16,
  },
  logo: {
    height: 36,
    width: 36,
    backgroundColor: C.green,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
