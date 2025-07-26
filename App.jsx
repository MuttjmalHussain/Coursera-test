import { StatusBar } from 'expo-status-bar';
import './global.css';
import AppNavigation from './navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
      <StatusBar style='light' />
    </SafeAreaProvider>
  );
}
