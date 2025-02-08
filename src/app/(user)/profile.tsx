import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { StyleSheet } from "react-native";

const profile = () => {
  const { profile, session } = useAuth();
  console.log(profile.group, session?.user.email);

  return (
    <View>
      <Text style={styles.profileText}>{profile.group}</Text>

      <Text style={styles.profileText}>{session?.user.email}</Text>

      <TouchableOpacity
        style={[styles.button, { opacity: session ? 1 : 0.5 }]}
        onPress={async () => await supabase.auth.signOut()}
        disabled={!session}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 130,
    marginTop: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginVertical: 20,
  },
});
