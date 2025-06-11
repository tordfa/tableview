import './App.css';
import Table from './components/Table';
import Controlpanel from './components/Controlpanel';
import { useState } from 'react';

function App() {

  const [tableList, setTableList] = useState(getTables())

  // let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}

  function createRandomId(){
    let date = new Date();
    return date.getDate().toString() + date.getMonth().toString() + Math.floor(date.getTime()* Math.random());
  }

  function createTable(){
    let tableArray = getTables();
    let tableId = createRandomId();
    let newTable = {id: tableId, name: "Test Table", x: 100, y: 200}
    tableArray.push(newTable);
    saveTables(tableArray);
  }
  function deleteTable(tableid){

    let tableArray = getTables();
    for (let i = 0; i < tableArray.length; i++) {
      if(tableArray[i].id === tableid){
        tableArray.splice(i,1);
      }
      saveTables(tableArray);
    }
  }

  function getTables(){
    let tables = [];
    if(localStorage.getItem('tables')){
      tables = JSON.parse(localStorage.getItem('tables'));
    }
    return tables;
  }

  function saveTables(tablearray){
    localStorage.setItem('tables', JSON.stringify(tablearray));
    setTableList(tablearray);

  }

  return (
    <div className="App">
      <h1>Table View</h1>
      <Controlpanel createTable={createTable}></Controlpanel>
      <div className='tableContainer'>
        {tableList
        ? tableList.map((table) => {return <Table key={table.id} xPos={table.x} yPos={table.y} deleteTable={()=>{deleteTable(table.id)}}></Table>})
        : <></>
        }
      </div>
    </div>
  );
}

export default App;
