import React from 'react';
import { StyleSheet, View } from 'react-native';

const DummyComponent = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default DummyComponent;
