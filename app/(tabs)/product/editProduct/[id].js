import {useLocalSearchParams} from "expo-router";

import EditProduct from "../../../../screens/EditProduct";

export default function Page() {
    const {id} = useLocalSearchParams();


    return (
        <EditProduct id={id}/>
    );
}
