import * as tableController from '../controllers/tableController'
import { openTableModal } from '../util/util'

function Controlpanel({setIsEdit,isEdit,tableList,setTableList,setActiveFloor, floors, setFloors}){


    function handleSelect(e){
        console.log(e.currentTarget.options[e.currentTarget.selectedIndex].id);
        setActiveFloor(e.currentTarget.options[e.currentTarget.selectedIndex].id)
    }
    return (
        <div className="controlpanel">
            <div>
                {isEdit
                ?
                <>
                <button onClick={openTableModal}>Add Table</button>
                <button onClick={()=>{tableController.createFloor(floors,setFloors,{name:'Test floor'})}}>Add Floor</button>
                <button onClick={()=>{tableController.saveTableview(tableList,floors);setIsEdit((prevstate) => !prevstate);}}>Save</button>
                <button onClick={()=>{
                    setIsEdit(false);
                    setTableList(tableController.getTables())}}>Cancel</button>
                </>                                    
                : 
                <button onClick={() => setIsEdit(true)}>Edit Table view</button>
                }

            </div>

            <div>
                <label htmlFor="floors">Floor:</label>
                <select name="floors" id="floorsselector" onChange={handleSelect}>
                    {floors
                    ? floors.map((floor)=>{
                        
                        return <option key={floor.id} value={floor.name} id={floor.id}>{floor.name}</option>
                    })
                    : <option value={"placeholder1"} id={0}>Placeholder</option>
                    }
                    
                </select>
            </div>
        </div>
    )
}

export default Controlpanel;