 import { supabase } from "../supabaseClient";
 
 // let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
  function createRandomId(){
    let date = new Date();
    return date.getDate().toString() + date.getMonth().toString() + Math.floor(date.getTime()* Math.random());
  }

  export function createTable(setTableList,tableList,tableInfo,activeFloor){
    let tableId = createRandomId();
    let newTable = {
      id: tableId, 
      name: tableInfo.name,
      number: tableInfo.number,
      seats: tableInfo.seats, 
      x: 100, 
      y: 200,
      floor: activeFloor,
    }
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

    export function saveTableview(tableList,floors){
    localStorage.setItem('tables', JSON.stringify(tableList));
    // localStorage.setItem('floors', JSON.stringify(floors));
  }

  export function createFloor(floors, setFloors, floorInfo){
    let floorId = createRandomId();
    let newFloor = {
      name: floorInfo.name,
      id: floorId
    }
    let newArray =  [...floors, newFloor];

    setFloors(newArray);
  }
  export function getFloors(){
    let floors = [];
    if(localStorage.getItem('floors')){
      floors = JSON.parse(localStorage.getItem('floors'));
    }else{
      floors =[
        {
          name: 'Placeholder Floor',
          id: 0,
        }
      ]
    }
    return floors;
  }

  export function setFloors(floors){
    localStorage.setItem('floors', JSON.stringify(floors));
  }

  export async function testDbSelect(){
    const {data, error} = await supabase.from('tables').select()
    return data;
  }
