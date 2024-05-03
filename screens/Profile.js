import {View, Text, StyleSheet} from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Profile To Be edited.
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