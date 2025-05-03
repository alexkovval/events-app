import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { styles } from './LoginStyle';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/api/authApi';
import { setCredentials } from '../../redux/slices/authSlice';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', { username })
      const result = await login({ username, password }).unwrap();
      dispatch(setCredentials({ token: result.token, user: { username, id: result.user.id } }));
    } catch (err: any) {
      console.error('Login error:', err);
      Alert.alert('Error', err?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome! Let's party!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: username && password ? '#6200ee' : '#ccc' }
          ]}
          onPress={handleLogin}
          disabled={!username || !password}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
