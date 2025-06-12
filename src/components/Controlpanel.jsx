function Controlpanel({setIsEdit,createTable}){
    return (
        <div className="controlpanel">
            <button onClick={() => setIsEdit((prevstate) => !prevstate)}>Edit Table view</button>
            <button onClick={createTable}>Add Table</button>
            <button>Add Floor</button>
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