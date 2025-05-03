import { Platform, StyleSheet } from "react-native";
import { vs } from "../../assets/helpers";

export const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: vs(5),
        paddingBottom: vs(5),
        borderRadius: 10,
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
});