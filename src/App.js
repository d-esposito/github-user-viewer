import './App.css';
import UserProfile from './components/UserProfile';
import { OctokitProvider } from './contexts/OctokitContext';

function App() {
  return (
    <div className='app'>
      <OctokitProvider>
        <UserProfile />
      </OctokitProvider>
    </div>
  );
}

export default App;
