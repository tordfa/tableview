import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';

function App() {
  return (
    <div className="App">
      <h1>Table View</h1>
      <Controlpanel></Controlpanel>
      <div className='tableContainer'>
        <Table xPos={100} yPos={100}></Table>
        <Table xPos={300} yPos={100}></Table>
        <Table xPos={100} yPos={300}></Table>
        <Table xPos={300} yPos={300}></Table>
      </div>
    </div>
  );
}

export default App;
