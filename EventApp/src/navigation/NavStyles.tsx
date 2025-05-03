import { StyleSheet, Dimensions, Platform } from "react-native";
import { vs } from "../assets/helpers";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    tabNavigator: {
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: vs(105)
    },
});