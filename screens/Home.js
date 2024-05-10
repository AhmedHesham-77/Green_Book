import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import {useState, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    FlatList,
    useWindowDimensions,
    Platform,
    Dimensions,
    Pressable,
    TextInput
} from 'react-native';
import {getProducts} from '../firebase/products';
import {FontAwesome} from '@expo/vector-icons';
import {router, useFocusEffect} from 'expo-router';
import {deleteProduct} from '../firebase/products';
import {LinearGradient} from 'expo-linear-gradient';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [keyForForceUpdate, setKeyForForceUpdate] = useState(0);
    const [searchButton, setSearchButton] = useState(false);
    const windowWidth = useWindowDimensions().width;

    const getAllProducts = async () => {
        const newProducts = await getProducts();
        setProducts(newProducts);
        setLoaded(true);
    };

    const handleScreenResize = useCallback(() => {
        setKeyForForceUpdate((prevKey) => prevKey + 1);
    }, []);

    useEffect(() => {
        Dimensions.addEventListener('change', handleScreenResize);
        return () => {
            Dimensions.removeEventListener('change', handleScreenResize);
        };
    }, [handleScreenResize]);

    useFocusEffect(useCallback(() => {
        getAllProducts();
    }, []));

    if (!loaded) {
        return <Loading/>;
    } else {
        const numColumns = Math.floor(windowWidth / 150);
        return (

            <SafeAreaView style={[styles.parent, {width: windowWidth}]}>
                <LinearGradient style={[styles.parent, {width: windowWidth}]} colors={['#96df71', '#5dc87f', '#3da35d']}
                                start={{x: 0.187, y: 0.378}} end={{x: 1, y: 1}}>
                    <View style={{
                    // marginTop:15,
                    width: '100%',

                    alignItems: 'center',
                    justifyContent: 'center',

                    Height: '100%',
                    borderBottomRightRadius:30,
                    borderBottomLeftRadius:30,
                    zIndex:1000,
                    backgroundColor:'#fff'
                }}>
                    <Pressable
                        style={styles.searchBar} onPress={() => {
                        router.navigate('(tabs)/search');
                    }}>
                        <FontAwesome name='search' size={24} color='green'
                                     style={{width: '10%', paddingVertical: '4%', marginRight: '3%'}}/>
                        <TextInput placeholder='Enter your wanted product' editable={false}
                                   style={styles.textInput}/>
                    </Pressable>

                </View>

                    <FlatList
                        key={keyForForceUpdate.toString()}
                        data={products}
                        renderItem={({item}) => <ProductCard product={item} onDelete={async () => {
                            await deleteProduct(item.id);
                            const newProductList = products.filter((curProduct) => curProduct.id !== item.id);
                            setProducts(newProductList);
                        }}/>}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.cardList}
                        numColumns={numColumns}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                    <StatusBar style='auto'/>
                </LinearGradient>
            </SafeAreaView>
        );
    }
};


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:25,
        zIndex:-100
    },
    searchBar: {
        width: '80%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'green',
        marginBottom:25

    },
    textInput: {
        paddingVertical: '4%',
        width: '70%',
        fontSize: 16,
    },
    cardList: {
        width: '100%',
        paddingHorizontal: 10,
    },
});

export default Home;