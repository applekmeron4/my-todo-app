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

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { seed } from "./utils/uuid-seed";

import Todo from "./Todo";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState("");
  const [loadedTodos, setLoadedTodos] = useState(false);

  useEffect(() => {
    setLoadedTodos(true);
  }, []);

  const addTodo = () => {
    if (newTodo !== "") {
      setTodos((prev) => {
        const ID = uuidv4({ random: seed() });
        return {
          ...prev,
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now(),
          },
        };
      });

      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos((prev) => {
      delete prev[id];
      return { ...prev };
    });
  };

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
          onSubmitEditing={addTodo}
        />
        <ScrollView contentContainerStyle={styles.todos}>
          {Object.values(todos).map((todo) => (
            <Todo key={todo.id} onDelete={deleteTodo} {...todo} />
          ))}
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
