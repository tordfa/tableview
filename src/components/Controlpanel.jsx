import * as tableController from '../controllers/tableController'
import { openTableModal } from '../util/util'

function Controlpanel({setIsEdit,isEdit,tableList,setTableList}){
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
                <select name="floors" id="floorsselector">
                    <option value={"placeholder1"}>Placeholder 1</option>
                    <option value={"placeholder2"}>Placeholder 2</option>
                    <option value={"placeholder3"}>Placeholder 3</option>
                    <option value={"placeholder4"}>Placeholder 4</option>
                    <option value={"placeholder5"}>Placeholder 5</option>
                </select>
            </div>
        </div>
    )
}

export default Controlpanel;