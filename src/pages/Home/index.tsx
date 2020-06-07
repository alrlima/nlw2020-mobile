import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/logo.png";
import background from "../../assets/home-background.png";

const Home = () => {
  const navigation = useNavigation();

  const [uf, setUF] = useState("");
  const [cidade, setCidade] = useState("");

  function navigateToPoints() {
    navigation.navigate("Points", {
      uf,
      cidade,
    });
  }

  return (
    // <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : undefined }>
    <ImageBackground
      source={background}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={logo} />
        <View>
          <Text style={styles.title}>
            Seu marketplace de coleta de resídous
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a econtrarem pontos de coleta de forma eficiente.
          </Text>
        </View>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Digite a UF"
          value={uf}
          onChangeText={setUF}
          maxLength={2}
          autoCapitalize="characters"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={cidade}
          onChangeText={setCidade}
          autoCorrect={false}
        />
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={navigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24}></Icon>
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
    //</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
