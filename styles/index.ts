// import { colors, fontSize } from "@/constants/colors";
import { colors, fontSize } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSize.base,
    color: colors.text,
  },
});
