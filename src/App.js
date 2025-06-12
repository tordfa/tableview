import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';
import * as tableController from "./controllers/tableController"
import {useState } from 'react';

function App() {

  const [tableList, setTableList] = useState(tableController.getTables())
  const [isEdit, setIsEdit] = useState(false);

  let tempTableArray = tableController.getTables();

  return (
    <div className="App">
      <h1>Table View</h1>
      <Controlpanel 
      createTable={()=>{tableController.createTable(setTableList)}} 
      saveTables={()=>{tableController.saveTables(tempTableArray,setTableList)}} 
      setIsEdit={setIsEdit}
      isEdit={isEdit}
      ></Controlpanel>
      <div className='tableContainer'>
        {tableList
        ? tableList.map((table) => {
          return <Table 
            key={table.id} 
            xPos={table.x} 
            yPos={table.y} 
            deleteTable={()=>{tableController.deleteTable(table.id,setTableList)}}
            isEdit={isEdit}
            tempTableArray={tempTableArray}
            tableId={table.id}
            ></Table>})
        : <></>
        }
      </div>
    </div>
  );
}

export default App;
