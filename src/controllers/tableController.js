 // let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
  function createRandomId(){
    let date = new Date();
    return date.getDate().toString() + date.getMonth().toString() + Math.floor(date.getTime()* Math.random());
  }

  export function createTable(setTableList,tableList){
    let tableId = createRandomId();
    let newTable = {id: tableId, name: "Test Table", x: 100, y: 200}
    // Creating new array here because React will not rerender changes to objects in shallow copy arrays.
    let newArray = [...tableList, newTable]
    setTableList(newArray);

    
  }
  export function deleteTable(tableid,setTableList,tableList){
    for (let i = 0; i < tableList.length; i++) {
      if(tableList[i].id === tableid){
        let newArray = [...tableList]
        newArray.splice(i,1);
        setTableList([...newArray]);
      }
    }
  }

  export function getTables(){
    let tables = [];
    if(localStorage.getItem('tables')){
      tables = JSON.parse(localStorage.getItem('tables'));
    }
    
    return tables;
  }

  export function saveTables(tableList){
    localStorage.setItem('tables', JSON.stringify(tableList));
  }