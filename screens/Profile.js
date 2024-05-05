import { useState , useEffect } from 'react';
import { View , Image , Text , StyleSheet , Pressable , TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { logout } from '../firebase/auth';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail , updateUser } from '../firebase/users';
import Loading from '../components/Loading';
import { LinearGradient } from 'expo-linear-gradient';
// import Dialog from "react-native-dialog";

export default function Profile () {

    const [userData , setUserData] = useState(null);
	const [name , setName] = useState("");
	const [phone , setPhone] = useState("");
	const [visible , setVisible] = useState(false);

	const handleCancel = () => {
		setVisible(false);
	};

	const handleEditProfile = () => {
		setVisible(true);
	};

	const handleEdit = () => {
		setVisible(false);




	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await AsyncStorage.getItem('user');
				const userEmail = JSON.parse(user).email;
				const userData = await getUserByEmail(userEmail);
				setUserData(userData);
				setName(userData.name);
				setPhone(userData.phone);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const handleLogout = async () => {
		await logout();
		router.navigate("/account/login");
	};

	const handleUpdate = async () => {
		try {
			const user = { name: name , phone: phone };
			await updateUser(userData.id , user);
		} catch (error) {
			console.log(error);
		}
	};

	if (!userData) {
		return <Loading />;
	} else {
		return (
			<LinearGradient colors = {['#e6e6e6' , '#d1d1d1' , '#edecea']} start = {{ x: 0.187 , y: 0.378 }} end={{ x: 1 , y: 1 }} style={styles.parent} >
				<Pressable onPress = {handleLogout} style = {styles.logoutButton}>
					<AntDesign name = 'logout' size = {40} color = 'white' style = {styles.icon} />
				</Pressable>
				<View style = {{ backgroundColor: 'red' , width: '100%' , height: '40%' , alignItems: 'center' , justifyContent: 'center' }}>
					<Image source = {require('../assets/greenlogo.png')} style = {styles.logo} />
				</View>



				<Text style={styles.email}> Email: {userData.email} </Text>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={setName}
					placeholder = "Enter your name"
				/>
				<TextInput
					style={styles.input}
					value={phone}
					onChangeText={setPhone}
					placeholder = "Enter your phone number"
				/>
				<Pressable onPress = {handleUpdate} style={styles.button}>
					<Text style = {styles.buttonText}> Save Changes </Text>
				</Pressable>

				<Pressable onPress = {handleEditProfile} style={styles.button}>
					<Text style = {styles.buttonText}> EDIT Profile </Text>
				</Pressable>

				{/* <Dialog.Container visible = {visible}>
					<Dialog.Title> Edit your username and password </Dialog.Title>
					<Dialog.Description> Do you want to edit this account? You cannot undo this action. </Dialog.Description>
					<Dialog.Input value = {name} onChangeText = {setName} placeholder = 'Enter your new username' />
					<Dialog.Input value = {phone} onChangeText = {setPhone} placeholder = 'Enter your new phone' />
					<Dialog.Button label = 'CANCEL' onPress = {handleCancel} />
					<Dialog.Button label = 'EDIT' onPress = {handleEdit} style = {{ backgroundColor: 'green' , color: 'white' }} />
				</Dialog.Container> */}



			</LinearGradient>
		);
	}










	}










// #265d0f


const styles = StyleSheet.create({
	parent: {
		flex: 1,
		width: '100vw',
		height: '100vh',
		paddingTop: '10%'
    },
	logo: {
		width: '100%',
		height: '100%',
		resizeMode: 'stretch'
	},
	logoutButton: {
		backgroundColor: 'yellow',
		width: '100%',
		height: '7.5%',
		alignItems: 'flex-end',
		borderRadius: 88






		// width: '100%',
		// justifyContent: 'center',
		// alignContent: 'center',


		// paddingVertical: 12,
		// paddingHorizontal: 20,
		// borderRadius: 8,
		// marginTop: 20,
		// alignItems: "center",
	},
	icon: {
		width: '25%',
		backgroundColor: 'blue',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		paddingTop: '1.5%',
		marginRight: '5%',
	},







  email: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333", // Dark gray color for email text
  },
  input: {
    height: 40,
    borderColor: "#ccc", // Light gray border
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#fff", // White background
  },
  buttonText: {
    color: "#fff", // White button text
    fontSize: 16,
  },
});
