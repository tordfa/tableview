 // let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
  function createRandomId(){
    let date = new Date();
    return date.getDate().toString() + date.getMonth().toString() + Math.floor(date.getTime()* Math.random());
  }

  export function createTable(setTableList){
    let tableArray = getTables();
    let tableId = createRandomId();
    let newTable = {id: tableId, name: "Test Table", x: 100, y: 200}
    tableArray.push(newTable);
    saveTables(tableArray,setTableList);
  }
  export function deleteTable(tableid){

    let tableArray = getTables();
    for (let i = 0; i < tableArray.length; i++) {
      if(tableArray[i].id === tableid){
        tableArray.splice(i,1);
      }
      saveTables(tableArray);
    }
  }

  export function getTables(){
    let tables = [];
    if(localStorage.getItem('tables')){
      tables = JSON.parse(localStorage.getItem('tables'));
    }
    return tables;
  }

  export function saveTables(tablearray, setTableList){
    localStorage.setItem('tables', JSON.stringify(tablearray));
    setTableList();
  }