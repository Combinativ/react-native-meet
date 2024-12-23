import * as React from 'react';
import { useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import type { RootStackParamList } from './App';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_URL = 'wss://pointchattest-1khjl28v.livekit.cloud';
const DEFAULT_TOKEN = '';
//User A
const URL_KEY = 'wss://pointchattest-1khjl28v.livekit.cloud';
const TOKEN_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ5Njk5NTksImlzcyI6IkFQSXZFZTluZUxta2pveCIsIm5iZiI6MTczNDk2OTA1OSwic3ViIjoiVXNlciBBIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6IlBvaW50Y2hhdCIsInJvb21Kb2luIjp0cnVlfX0.ytxPv8sZxoTSp-Y0fkruL2wDK7ArE4WWAPcYhFwpX8U';
export const PreJoinPage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'PreJoinPage'>) => {
  const [url, setUrl] = useState(URL_KEY);
  const [token, setToken] = useState(TOKEN_KEY);

  useEffect(() => {
    AsyncStorage.getItem(URL_KEY).then((value) => {
      if (value) {
        setUrl(value);
      }
    });

    AsyncStorage.getItem(TOKEN_KEY).then((value) => {
      if (value) {
        setToken(value);
      }
    });
  }, []);

  const { colors } = useTheme();

  let saveValues = (saveUrl: string, saveToken: string) => {
    AsyncStorage.setItem(URL_KEY, saveUrl);
    AsyncStorage.setItem(TOKEN_KEY, saveToken);
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>URL</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setUrl}
        value={url}
      />

      <Text style={{ color: colors.text }}>Token</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setToken}
        value={token}
      />

      <Button
        title="Connect"
        onPress={() => {
          navigation.push('RoomPage', { url: url, token: token });
        }}
      />

      <View style={styles.spacer} />

      <Button
        title="Save Values"
        onPress={() => {
          saveValues(url, token);
        }}
      />

      <View style={styles.spacer} />

      <Button
        title="Reset Values"
        onPress={() => {
          saveValues(DEFAULT_URL, DEFAULT_TOKEN);
          setUrl(DEFAULT_URL);
          setToken(DEFAULT_TOKEN);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  spacer: {
    height: 10,
  },
});
