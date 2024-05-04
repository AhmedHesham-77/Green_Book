import {useLocalSearchParams} from "expo-router";

import Product from "../../../screens/Product";

export default function Page() {
    const {id} = useLocalSearchParams();


    return (
        <Product id={{id}}/>
    );
}
