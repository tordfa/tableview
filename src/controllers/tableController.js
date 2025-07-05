

// let tabletemplate = {id: tableId, name: tableName, x: tableXPos, y: tableYPOS}
export async function createTable(table_name,table_number,table_seats,floor_id,x_pos,y_pos) {
  
  const createTableUrl = process.env.REACT_APP_HOST_URL + "/api/createtable"
  try {
    const response = await fetch(createTableUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table_name: table_name,
        table_number: table_number, 
        table_seats: table_seats,
        floor_id: floor_id,
        x_pos: x_pos,
        y_pos: y_pos
      })
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

export async function createFloor(floor_name) {

    const createFloorUrl = process.env.REACT_APP_HOST_URL + "/api/createfloor"
  try {
    const response = await fetch(createFloorUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(floor_name)
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

export async function deleteFloor(floorid_input) {

    const deleteFloorUrl = process.env.REACT_APP_HOST_URL + "/api/deletefloor"
  try {
    const response = await fetch(deleteFloorUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({floor_id: floorid_input})
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