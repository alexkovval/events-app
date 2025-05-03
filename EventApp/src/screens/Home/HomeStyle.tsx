import { StyleSheet } from "react-native";
import { hs, ms, vs } from "../../assets/helpers";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    alertsButton: {
        width: hs(55),
        height: vs(55),
        position: 'absolute',
        top: vs(20),
        left: hs(20),
        borderRadius: ms(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
    },
    alertsIcon: {
        width: hs(20),
        height: vs(24),
    },
    greeting: {
        fontSize: ms(24),
        fontWeight: '700',
        padding: ms(25),
    },
    description: {
        fontSize: ms(20),
        fontWeight: '700',
        paddingHorizontal: hs(16),
    },
    loading: {
        textAlign: 'center',
        marginTop: vs(20),
        fontSize: ms(16),
    },
    list: {
        paddingBottom: vs(16),
    },
});
