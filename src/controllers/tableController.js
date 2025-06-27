import { supabase } from "../supabaseClient";

// let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
export async function createTable(setTableList, tableList, tableInfo, activeFloor) {
  const userdata = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('tables')
    .insert({
      user_id: userdata.data.user.id,
      name: tableInfo.name,
      number: tableInfo.number,
      seats: tableInfo.seats,
      x: 100,
      y: 200,
      floor: activeFloor
    })
    .select()

  if (error) { 
    console.error('There was an error creating table: ', error);
    return;
   }

  let newArray = [...tableList, data[0]]
  setTableList(newArray);

}
export async function deleteTable(tableid, setTableList, tableList) {

  const {error} = await supabase.from('tables').delete().eq('id',tableid)
  if (error) {
    console.error('There was an error deleting table');
    return;
  }

  //Delete from state
  for (let i = 0; i < tableList.length; i++) {
    if (tableList[i].id === tableid) {
      let newArray = [...tableList]
      newArray.splice(i, 1);
      setTableList([...newArray]);
    }
  }
}

export async function getTables() {
  const {data, error} = await supabase.from('tables').select()
  if(error){
    throw new Error("There was an error getting tables", error)
  }
  return data;

}

export async function saveTables(tableList) {
  const { error } = await supabase
    .from('tables')
    .upsert(tableList);
  if (error) {
    console.error("Error upserting tables: ", error);
  }
}

export async function createFloor(floorInfo) {
  const userdata = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('floors')
    .insert({
      name: floorInfo.name,
      user_id: userdata.data.user.id
    })
    .select();

  if (error) {
    throw new Error("There was an error creating floor",error);
  }
  return data[0];
}

export async function deleteFloor(floorid_input){
  const {data,error} = await supabase
    .from('floors')
    .delete().eq('id', floorid_input)
  if(error){
    throw new Error("There was an error deleting floors", error)
  }
  return {success: true, data: data}
}

export async function getFloors() {

  const {data, error} = await supabase.from('floors').select();
  if(error){
    throw new Error("There was an error getting floors", error)
  }
  return data;
}