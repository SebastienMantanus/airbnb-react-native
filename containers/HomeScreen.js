import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { Button, Text, View, FlatList, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

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

  return (
    !isLoading && (
      <View>
        <Image source={logo} style={styles.splashLogo}></Image>
        <FlatList
          data={response}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const newArraw = [...item.photos];
            const picture = newArraw.shift();
            const pictureUrl = picture.url;

            return (
              <>
                <Image
                  source={{ uri: pictureUrl }}
                  style={styles.roomPictures}
                  resizeMode="cover"
                ></Image>
                <Text>{item.title}</Text>
              </>
            );
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

const styles = StyleSheet.create({
  splashLogo: {
    resizeMode: "contain",
    width: 50,
    height: 25,
    marginBottom: 20,
  },

  roomPictures: {
    height: 200,
    width: "100%",
  },
});
