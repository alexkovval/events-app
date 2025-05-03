import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        padding: 16,
    },
    info: {
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    details: {
        textAlign: 'right',
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    image: {
        width: '100%',
        height: 180,
    },
});