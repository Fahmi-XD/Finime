import * as React from 'react';
import { Appbar, Text, Avatar, Button } from 'react-native-paper';

import { StyleSheet, View } from 'react-native';

const HeaderComponent = () => (
    <Appbar.Header dark={true} style={styles.headerContainer}>
       <View style={styles.headerView}>
        <Avatar.Image style={styles.avatar} size={30} source={require('@/assets/images/syntx.png')} />
        <Text style={styles.textColor}>Finime</Text>
        <Button icon="login" style={styles.buttonLogin} labelStyle={{ color: "red" }} mode="outlined" onPress={() => console.log('Pressed')}>
          Sign In
        </Button>
       </View>
    </Appbar.Header>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)"
  },
  headerView: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  textColor: {
    color: "red",
    fontSize: 20,
    fontStyle: "normal",
    marginLeft: 10
  },
  avatar: {
    backgroundColor: "transparent"
  },
  buttonLogin: {
    marginLeft: "auto"
  }
})

export default HeaderComponent;