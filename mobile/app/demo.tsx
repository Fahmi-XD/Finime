import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

const Index = () => {

  return (
    <View style={{flex: 1, backgroundColor: "black"}}>
      <Text style={{ color: "white" }}>Index Screen</Text>
    </View>
  );
};

export default Index;