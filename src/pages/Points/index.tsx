import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from "expo-location";

import api from "../../services/api";

interface Item {
  item_id: number;
  titulo: string;
  imagem_url: string;
}

interface Point {
  point_id: number;
  imagem: string;
  imagem_url: string;
  nome: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  cidade: string;
}

const Points = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const routeParams = route.params as Params;

  const [myLocation, setMyLocation] = useState<[number, number]>([0, 0]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    async function loadMyLocation() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Oooops...",
          "Precisamos de sua permissão para obter a localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setMyLocation([latitude, longitude]);
    }

    loadMyLocation();
  }, []);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("points", {
        params: {
          cidade: routeParams.cidade,
          uf: routeParams.uf,
          "point_items.item_id": selectedItems,
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, [selectedItems]);

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToDetail(pointId: number) {
    navigation.navigate("Detail", { pointId });
  }

  function onSlectItem(id: number) {
    const selected = selectedItems.findIndex((item) => item === id);
    if (selected >= 0) {
      const itemsFilter = selectedItems.filter((item) => item !== id);
      setSelectedItems(itemsFilter);
      return;
    }

    setSelectedItems([...selectedItems, id]);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {myLocation[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: myLocation[0],
                longitude: myLocation[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  style={styles.mapMarker}
                  onPress={() => navigateToDetail(point.point_id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  key={point.point_id}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.imagem_url,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.nome}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItems.includes(item.item_id) ? styles.selectedItem : {},
              ]}
              key={String(item.item_id)}
              onPress={() => onSlectItem(item.item_id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.imagem_url} />
              <Text style={styles.itemTitle}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});

export default Points;
