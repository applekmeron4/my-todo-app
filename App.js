import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { AppLoading } from "expo";
import Todo from "./Todo";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [newTodo, setNewTodo] = useState("");
  const [loadedTodos, setLoadedTodos] = useState(false);

  useEffect(() => {
    setLoadedTodos(true);
  }, []);

  if (!loadedTodos) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>My To Do</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={"New To Do"}
          placeholderTextColor={"#999"}
          value={newTodo}
          onChangeText={setNewTodo}
          returnKeyType={"done"}
          autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.todos}>
          <Todo text={"Hello I'm a To Do"} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: {
    alignItems: "center",
  },
});
