import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages';

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

export default App;
