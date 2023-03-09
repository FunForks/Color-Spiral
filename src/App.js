import { ColourProvider } from './contexts/ColourContext.jsx'
import { ColourPicker } from "./components/ColourPicker";
import { ColourButton } from "./components/ColourButton";


function App() {
  return (
    <ColourProvider>
      <ColourButton />
      <ColourPicker />
    </ColourProvider>
  );
}

export default App;
