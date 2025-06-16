import * as tableController from '../controllers/tableController'
import { openTableModal } from '../util/util'

function Controlpanel({setIsEdit,isEdit,tableList,setTableList,setActiveFloor}){


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
                <button>Add Floor</button>
                <button onClick={()=>{tableController.saveTables(tableList);setIsEdit((prevstate) => !prevstate);}}>Save</button>
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
                    <option value={"placeholder1"} id={0}>Placeholder 1</option>
                    <option value={"placeholder2"} id={1}>Placeholder 2</option>
                    <option value={"placeholder3"} id={2}>Placeholder 3</option>
                </select>
            </div>
        </div>
    )
}

export default Controlpanel;