import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
	// const [data, setData] = useState([]);

	// function fetchData() {
	// 	fetch('http://192.168.0.102:8085/api/')
	// 		.then((response) => response.json())
	// 		.then((data) => setData(data));
	// }

	return (
		<View className="flex-1 ">
			<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }} className="m-10">
				<TouchableOpacity className="bg-green-500 p-3 rounded-lg  self-center" onPress={fetchData}>
					<Text className="text-white font-bold">Hello World</Text>
				</TouchableOpacity>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				<View>
					<Text>Test</Text>
				</View>
				{data && data.map((item, index) => (
					<View key={index}>
						<Text>{item.username}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
}