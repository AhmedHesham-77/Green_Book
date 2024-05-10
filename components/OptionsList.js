import Ionicons from '@expo/vector-icons/Ionicons';
import { MenuProvider , Menu , MenuOptions , MenuOption , MenuTrigger } from 'react-native-popup-menu';
import { View , Text , Alert  } from 'react-native';
import { router } from 'expo-router';
import { AntDesign , FontAwesome5 } from '@expo/vector-icons';

export default function OptionsList ({ product , onDelete }) {
    return (
        <View style = {{ width: 150 , height: 120 , position: 'absolute' , left: 0 , top: 7.5 , zIndex: 2 }}>
            <MenuProvider>
                <Menu>
                    <MenuTrigger>
                        <Ionicons name = 'options' size = {30} color = '#00ff00' />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect = {() => router.navigate(`product/editProduct/${product.id}`)} style = {{ flexDirection: 'row' , justifyContent: 'flex-start' , alignItems: 'center' }}>
                            <FontAwesome5 name = 'edit' size = {24} color = 'gold' />
                            <Text style = {{ fontSize: 16 , marginLeft: 5 }}> Edit product </Text>
                        </MenuOption>
                        <MenuOption onSelect = {() => {
                            onDelete();
                            Alert.alert('Product Deleted.' , 'The product has been successfully deleted.' , [{ text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', color: 'green' }] );
                            }} style = {{ flexDirection: 'row' , justifyContent: 'flex-start' , alignItems: 'center' }}>
                            <AntDesign name = 'delete' size = {24} color = 'red' />
                            <Text style = {{ fontSize: 16 , marginLeft: 5 }}> Delete product </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>
    );
};