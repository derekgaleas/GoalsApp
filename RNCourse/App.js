import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import * as SystemUI from "expo-system-ui";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#1e085e");
  }, []);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function generateGoalKey(goal) {
    return `${Math.random().toString()}_${goal}_${new Date()}`;
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function onAddGoalHandler(enteredGoalText) {
    if (enteredGoalText.length === 0) {
      alert("Please enter a goal!");
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: generateGoalKey(enteredGoalText) },
      ]);
      endAddGoalHandler();
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoalHandler={onAddGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            scrollEnabled={true}
            alwaysBounceVertical={false}
            keyExtractor={(item) => item.id}
            data={courseGoals}
            renderItem={({ item }) => {
              return (
                <GoalItem
                  text={item.text}
                  deleteGoalHandler={deleteGoalHandler}
                  id={item.id}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingHorizontal: 15,
    paddingTop: 50,
    flex: 1,
  },
  goalsContainer: {
    flex: 5,
  },
});
