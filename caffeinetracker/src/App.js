import logo from './logo.svg';
import './App.css';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import Homepage from './pages/Homepage';


function App() {
  return (
    <ChakraBaseProvider>
      <Homepage  />
    </ChakraBaseProvider>
  );
}

export default App;
