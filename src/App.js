import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';
import Tableinfo from './components/Tableinfo';
import * as tableController from "./controllers/tableController"
import {useState } from 'react';

function App() {

  const [tableList, setTableList] = useState(tableController.getTables())
  const [isEdit, setIsEdit] = useState(false);
  const [activeTable, setActiveTable] = useState();

  let tempTableArray = tableController.getTables();

  return (
    <div className="App">

      <div>
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
              setActiveTable={()=>{setActiveTable(table)}}
              activeTable={activeTable}
              ></Table>})
          : <></>
          }
        </div>
      </div>
      <Tableinfo activeTable={activeTable}></Tableinfo>

    </div>
  );
}

export default App;
