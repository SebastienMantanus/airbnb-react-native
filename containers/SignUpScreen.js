import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";

import { useWindowDimensions } from "react-native";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMatch, setPasswordMatch] = useState();
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (password === passwordCheck) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email,
            username,
            description,
            password,
          }
        );
        const userToken = "secret-token";
        setToken(userToken);
        alert("Compte Créé !");
      } catch (error) {
        console.log(error.response);
        alert("Création de compte ratée");
      }
    } else {
      console.log("mots de passes pas identiques");
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View
          style={[
            styles.mainContainer,
            { height: height - Constants.statusBarHeight },
          ]}
        >
          <View>
            <Image source={logo} style={styles.splashLogo}></Image>
            <Text style={styles.pageTitle}>Sign Up</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />

            <TextInput
              style={{
                height: 100,
                borderColor: "#ffbac0",
                borderWidth: 2,
                padding: 10,
                marginBottom: 20,
              }}
              placeholder="describe yourself in few words"
              multiline={true}
              textAlignVertical="top"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="confirm password"
              value={passwordCheck}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPasswordCheck(text);
              }}
            />
          </View>

          <View></View>
          <View>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={async () => {
                console.log("Pressed");
                handleSubmit();
              }}
            >
              <Text style={[styles.greyText, styles.mediumSizeFont]}>
                Sign up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text
                style={[
                  styles.centerText,
                  styles.greyText,
                  styles.smallTopMargin,
                ]}
              >
                Early have an account ? Sing in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-around",
    // borderColor: "red",
    // borderWidth: 3,
  },

  splashLogo: {
    resizeMode: "contain",
    width: 200,
    height: 100,
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },

  form: {
    marginTop: 0,
    // borderColor: "blue",
    // borderWidth: 3,
  },

  textInput: {
    borderBottomWidth: 2,
    borderColor: "#ffbac0",
    width: 300,
    marginBottom: 40,
    padding: 5,
  },

  buttonView: {
    borderWidth: 2,
    height: 50,
    paddingHorizontal: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderRadius: 50,
  },

  greyText: {
    color: "grey",
  },
  mediumSizeFont: {
    fontSize: 20,
  },

  centerText: {
    textAlign: "center",
  },

  smallTopMargin: {
    marginTop: 20,
  },
});
