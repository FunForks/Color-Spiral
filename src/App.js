import { ColourProvider } from './contexts/ColourContext.jsx'
import { ColourItems } from "./components/ColourItems";


function App() {
  return (
    <ColourProvider>
      <ColourItems />
    </ColourProvider>
  );
}

export default App;
