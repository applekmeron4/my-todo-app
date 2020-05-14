import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Todo = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoValue, setTodoValue] = useState("");

  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const startEditing = () => {
    setTodoValue(text);
    setIsEditing(true);
  };

  const finishEditing = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity onPress={toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.unCompletedCircle,
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              styles.input,
              isCompleted ? styles.completedText : styles.unCompletedText,
            ]}
            value={todoValue}
            multiline={true}
            onChangeText={setTodoValue}
            returnKeyType={"done"}
            onBlur={finishEditing}
          />
        ) : (
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.unCompletedText,
            ]}
          >
            {todoValue}
          </Text>
        )}
      </View>

      {isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={finishEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✅</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={startEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: { color: "#bbb", textDecorationLine: "line-through" },
  unCompletedText: { color: "#353839" },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,

    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: "#bbb",
  },
  unCompletedCircle: {
    borderColor: "#f23557",
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});

export default Todo;
