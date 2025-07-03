import { useContext, useEffect } from 'react';
import { openTableModal } from '../../util/util'
import { TableContext } from './Tableview';
import { CreateTableModal } from '../modals/CreateTableModal';
import { CreateFloorModal } from '../modals/CreateFloorModal';

function Controlpanel() {
    const {
        tableList,
        setActiveTable,
        activeFloor, setActiveFloor,
        isEdit, setIsEdit,
        floors,
        deleteFloor,getTables, saveTables,
        setActiveModal
    } = useContext(TableContext);

    function handleSelect(e) {
        setActiveFloor(e.currentTarget.options[e.currentTarget.selectedIndex].id)
        setActiveTable(null);
    }

    useEffect(()=>{
        if(activeFloor){
            document.getElementById(activeFloor).selected = true;
        }

    },[activeFloor])

    return (
        <div className="controlpanel">
            <div>
                {isEdit
                    ?
                    <>
                        <button onClick={()=>{setActiveModal(<CreateTableModal/>); openTableModal()}}>Add Table</button>
                        <button onClick={()=>{setActiveModal(<CreateFloorModal/>); openTableModal()}}>Add Floor</button>
                        <button onClick={()=>{
                            deleteFloor(activeFloor)
                            }}>Delete Floor</button>
                        <button onClick={() => { 
                            saveTables(tableList); 
                            setIsEdit((prevstate) => !prevstate); 
                            }}>Save</button>
                        <button onClick={() => {
                            setIsEdit(false);
                            getTables();
                        }}>Cancel</button>

                    </>
                    :
                    <button onClick={() => setIsEdit(true)}>Edit Table view</button>
                }

            </div>

            <div>
                <label htmlFor="floors">Floor:</label>
                <select name="floors" id="floorsselector" onChange={handleSelect}>
                    {floors
                        ? floors.map((floor) => {

                            return <option key={floor.id} value={floor.name} id={floor.id}>{floor.floor_name} </option>

                        })
                        : <option value={"placeholder1"} id={0}>Placeholder</option>
                    }

                </select>
            </div>
        </div>
    )
}

export default Controlpanel;