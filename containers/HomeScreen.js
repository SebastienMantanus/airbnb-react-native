import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { Button, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-web";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setResponse(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    getData();
  }, []);
  console.log(response);
  return (
    !isLoading && (
      <View>
        <FlatList
          data={response}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            <Text>toto</Text>;
          }}
        />
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    )
  );
}
