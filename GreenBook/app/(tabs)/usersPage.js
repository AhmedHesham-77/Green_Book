import { View , Text } from 'react-native';
import { Link } from 'expo-router';
export default function Users () {
    return (
        <View>
            <Link href = {'../users/1'}>
                <Text> Go To User 1 Page </Text>
            </Link>
            <Link href = {'../users/2'}>
                <Text> Go To User 2 Page </Text>
            </Link>
            <Link href = {'../users/3'}>
                <Text> Go To User 3 Page </Text>
            </Link>
            <Link href = {'../users/4'}>
                <Text> Go To User 4 Page </Text>
            </Link>
        </View>
    );
};