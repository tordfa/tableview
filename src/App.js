import logo from './logo.svg';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <h1>Table View</h1>
      <div className='tableContainer'>
        <Table></Table>
        <Table></Table>
      </div>
    </div>
  );
}

export default App;
