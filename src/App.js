import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';
import * as tableController from "./controllers/tableController"
import {useState } from 'react';

function App() {

  const [tableList, setTableList] = useState(tableController.getTables())
  const [isEdit, setIsEdit] = useState(false);

  let tableArray = tableController.getTables();

  return (
    <div className="App">
      <h1>Table View</h1>
      <Controlpanel createTable={()=>{tableController.createTable(setTableList)}} setIsEdit={setIsEdit}></Controlpanel>
      <div className='tableContainer'>
        {tableList
        ? tableList.map((table) => {
          return <Table 
            key={table.id} 
            xPos={table.x} 
            yPos={table.y} 
            deleteTable={()=>{tableController.deleteTable(table.id,setTableList)}}
            isEdit={isEdit}
            ></Table>})
        : <></>
        }
      </div>
    </div>
  );
}

export default App;
