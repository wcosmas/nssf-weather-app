import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DegreesText = ({ degrees, measure }) => {
  return (
    <View style={styles.container}>
      <View style={styles.degreeContainer}>
        <Text style={[styles.text, { fontWeight: '700' }]}>
          {degrees}
        </Text>
        <Text style={styles.superscript}>o</Text>
      </View>

      <Text style={styles.text}>{measure}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  degreeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  superscript: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 10,
    marginLeft: 2,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default DegreesText;
