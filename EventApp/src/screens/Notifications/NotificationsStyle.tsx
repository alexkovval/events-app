import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
    card: { backgroundColor: '#f1f1f1', padding: 15, marginBottom: 10, borderRadius: 10 },
    cardTitle: { fontSize: 16, fontWeight: '600' },
    date: { fontSize: 12, color: '#999', marginTop: 5 },
    closeButton: {
        width: 30,
        backgroundColor: 'transparent',
    },
});