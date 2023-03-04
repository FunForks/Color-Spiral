import { ColourProvider } from './contexts/ColourContext.jsx'
import { ColourPicker } from "./components/ColourPicker";


function App() {
  return (
    <ColourProvider>
      <ColourPicker />
    </ColourProvider>
  );
}

export default App;
