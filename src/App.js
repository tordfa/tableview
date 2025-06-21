import './App.css';
import { AuthContext } from './context/AuthContext';
import {useState} from 'react';

import Tableview from './components/Tableview';

function App() {


  const [session, setSesssion] = useState(null);

  return (
    <AuthContext value={session}>
      <Tableview></Tableview>
    </AuthContext>

  );
}

export default App;
