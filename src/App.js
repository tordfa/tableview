import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';
import Tableinfo from './components/Tableinfo';
import * as tableController from "./controllers/tableController"
import {useState} from 'react';
import Newtablemodal from './components/Newtablemodal';

function App() {

  const [tableList, setTableList] = useState(tableController.getTables())
  const [isEdit, setIsEdit] = useState(false);
  const [activeTable, setActiveTable] = useState();
  const [activeFloor, setActiveFloor] = useState(0);

  return (
    <div className="App">

      <div>
        <Controlpanel 
        setTableList={setTableList}
        tableList={tableList} 
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        setActiveFloor={setActiveFloor}
        activeFloor={activeFloor}
        ></Controlpanel>
        
        <div className='tableContainer'>
          {tableList
          ? tableList.map((table) => {
            if(table.floor == activeFloor){
              return <Table 
              key={table.id} 
              xPos={table.x} 
              yPos={table.y} 
              isEdit={isEdit}
              tableList={tableList}
              setTableList={setTableList}
              tableId={table.id}
              setActiveTable={()=>{setActiveTable(table)}}
              activeTable={activeTable}
              ></Table>
            }else{
              return <></>
            }

            })
          : <></>
          }
        </div>
      </div>
      <Tableinfo activeTable={activeTable}></Tableinfo>
      <Newtablemodal setTableList={setTableList} tableList={tableList} activeFloor={activeFloor}></Newtablemodal>    
    </div>
  );
}

export default App;
