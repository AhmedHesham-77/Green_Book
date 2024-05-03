import {View, Text, StyleSheet} from 'react-native';

export default function Cart() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cart To Be edited.
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,

    },

})