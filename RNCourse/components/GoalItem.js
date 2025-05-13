import { View, StyleSheet, Text, Pressable } from "react-native";

export default function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={props.deleteGoalHandler.bind(this, props.id)}
        style={({ pressed }) => (pressed ? styles.pressedItem : null)}
      >
        <Text style={styles.goalItemText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
    backgroundColor: "#210644",
    borderRadius: 6,
  },
  goalItemText: {
    color: "white",
    padding: 8,
  },
});
