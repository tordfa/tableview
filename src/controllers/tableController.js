

// let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
export async function createTable(setTableList, tableList, newtable) {

  const createTableUrl = process.env.REACT_APP_HOST_URL + "/api/createtable"
  try {
    const response = await fetch(createTableUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newtable)
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error creating table');
    return { success: false, error: error }
  }

}
export async function deleteTable(tableid) {

  const deleteTableUrl = process.env.REACT_APP_HOST_URL + "/api/deletetable"
  try {
    const response = await fetch(deleteTableUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: tableid})
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error creating table');
    return { success: false, error: error }
  }

}

export async function getTables() {
  const getTablesUrl = process.env.REACT_APP_HOST_URL + "/api/gettables"
  try {
    const response = await fetch(getTablesUrl, {
      credentials: 'include',
      method: "GET"
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error getting tables');
    return { success: false, error: error }
  }
}

export async function saveTables(tableList) {

  console.log(tableList);

  const saveTablesUrl = process.env.REACT_APP_HOST_URL + "/api/savetables"
  try {
    const response = await fetch(saveTablesUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tableList)
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return { success: true, response: response };
  }
  catch (error) {
    console.error('There was an error saving tables');
    return { success: false, error: error }
  }

}

export async function createFloor(floorInfo) {
  // const userdata = await supabase.auth.getUser();
  // const { data, error } = await supabase
  //   .from('floors')
  //   .insert({
  //     name: floorInfo.name,
  //     user_id: userdata.data.user.id
  //   })
  //   .select();

  // if (error) {
  //   throw new Error("There was an error creating floor",error);
  // }
  // return data[0];
}

export async function deleteFloor(floorid_input) {
  // const {data,error} = await supabase
  //   .from('floors')
  //   .delete().eq('id', floorid_input)
  // if(error){
  //   throw new Error("There was an error deleting floors", error)
  // }
  // return {success: true, data: data}
}

export async function getFloors() {

  const getFloorsUrl = process.env.REACT_APP_HOST_URL + "/api/getfloors"
  try {
    const response = await fetch(getFloorsUrl, {
      credentials: 'include',
      method: "GET"
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error getting tables');
    return { success: false, error: error }
  }
}