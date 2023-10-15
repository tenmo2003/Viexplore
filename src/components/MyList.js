import { Button } from "@rneui/base";
import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

function FetchButton() {
    const [list, setList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.0.102:8085/api/public/tests');
            const data = await response.json();
            setList(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Button className="bg-blue-500" title="Fetch Data" onPress={fetchData}/>
            <ScrollView>
                {list.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => { console.log(item.username) }}>
                            <Text>{item.username}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default FetchButton;