import React, {useState} from "react";
import {
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet,

} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {register} from "../firebase/auth";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateChanged, setDateChanged] = useState(false);

    // set max year 10 years from current date
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 10);
    maxDate.setDate(31);
    maxDate.setMonth(11);

    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 70);
    minDate.setDate(31);
    minDate.setMonth(11);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    }

    const formatDate = (date) => {
        let nwdate = new Date(date);

        let year = nwdate.getFullYear();
        let month = nwdate.getMonth() + 1;
        let day = nwdate.getDate();

        return `${day}-${month}-${year}`;
    }

    const onChangeDate = ({type}, selectedDate) => {
        if (type === 'set') {
            const newDate = selectedDate;
            setDate(newDate);
            togglePicker();
            setDateOfBirth(formatDate(newDate));
            setDateChanged(true)
        } else
            togglePicker();
    }

    const handlePress = async () => {
        const isValidName = /^[a-zA-Z\s]*$/.test(name)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) return setError("Email and password are required");
        else if (password.length < 6)
            return setError("Password must be at least 6 characters");
        else if (!emailRegex.test(email))
            return setError("Invalid email");
        else if (!name)
            return setError("please enter name");
        else if (!isValidName) {
            return setError("name can only contain letters ");
        } else if (!phone)
            return setError("please enter phone number");
        else if (!dateChanged)
            return setError("Enter your birthdate");
        try {
            await register(name, email, phone, password, dateOfBirth);
            router.navigate("/account/login");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("Email already in use");
            } else {
                console.log(`Error ${JSON.stringify(error)}`);
                setError(error.code);
            }
        }
    };

    return (
        <LinearGradient
            colors={["#96df71", "#5dc87f", "#3da35d"]}
            start={{x: 0.187, y: 0.378}}
            end={{x: 1, y: 1}}
            style={styles.container}
        >
            <Text style={styles.title}>Register</Text>
            <TextInput
                placeholder="name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={(p) => {
                    const formattedPhone = p.replace(/[^0-9]/g, '');
                    if (formattedPhone.length <= 20)
                        setPhone(formattedPhone);
                }}
                style={styles.input}
                keyboardType="numeric"
            />
            <View style={styles.input}>
                {showPicker && (<DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDate}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                />)}
                {!showPicker && (<Pressable onPress={togglePicker}>
                    <TextInput
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        editable={false}
                        style={styles.date}
                    />
                </Pressable>)}
            </View>
            <View style={styles.passwordInput}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.password}
                />
                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.togglePassword}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="black"
                    />
                </Pressable>
            </View>
            <Button
                title="Register"
                textColor="white"
                onPress={handlePress}
                styles={({pressed}) => [
                    {opacity: pressed ? 0.2 : 1},
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#a4ed80",
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        marginTop: 30,
                        marginBottom: 20,
                        width: "80%",
                        borderRadius: 10,
                        backgroundColor: "#246c3a",
                    },
                ]}
            />
            <Pressable onPress={() => router.replace("/account/login")}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </Pressable>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </LinearGradient>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontFamily: "Gabarito,cursive",
        fontSize: 52,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
    },
    logoText: {
        color: "#FFF",
        fontSize: 40,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    passwordInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginBottom: 20,
    },
    password: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    togglePassword: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{translateY: -12}],
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        borderRadius: 12,
        backgroundColor: "#5E8B7E",
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    link: {
        color: "#a4ed80",
        textDecorationLine: "underline",
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    date: {
        color: 'black'
    }
});
