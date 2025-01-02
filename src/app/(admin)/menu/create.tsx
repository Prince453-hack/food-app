import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const resetField = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(Number(price))) {
      setErrors("Price must be a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) return;

    console.log("Product created", name, price);

    // Reset field
    resetField();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {errors ? <Text style={{ color: "red" }}>{errors}</Text> : null}
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
});
