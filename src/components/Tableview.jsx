import '../App.css';
import Table from './Table';
import Controlpanel from './Controlpanel';
import Tableinfo from './Tableinfo';
import * as tableController from "../controllers/tableController"
import { createContext, useEffect, useState } from 'react';
import MainModal from './modals/MainModal';

export const TableContext = createContext(null);

function Tableview() {

    const [tableList, setTableList] = useState(null)
    const [floors, setFloors] = useState(null)
    const [isEdit, setIsEdit] = useState(false);
    const [activeTable, setActiveTable] = useState();
    const [activeFloor, setActiveFloor] = useState(null);


    async function getTables() {
        let result = await tableController.getTables();
        if (!result.success) {
            console.error(result.error);
            return;
        }
        setTableList(result.tables);
    }

    async function getFloors() {
        let result = await tableController.getFloors();
        if (!result.success) {
            console.error(result.error);
            return;
        }
        setActiveFloor(result.floors[0].id)
        setFloors(result.floors);

    }

    async function createFloor(name_input) {
        let { success, result } = await tableController.createFloor({ floor_name: name_input })
        if (!success) { console.error("Error creating floor"); return; }
        console.log(result.rows[0]);
        let newArray = [...floors, result.rows[0]]
        setFloors(newArray);
    }
    async function deleteFloor(floorid_input) {
        try {
            await tableController.deleteFloor(floorid_input);
            getFloors();
        }
        catch (error) {
            console.error(error);
        }
    }
    // Getting Floors and tables from DB
    useEffect(() => {
        getTables();
        getFloors();
    }, [])


    return (
        <>
            <TableContext value={{
                tableList, setTableList,
                floors, setFloors,
                isEdit, setIsEdit,
                activeTable, setActiveTable,
                activeFloor, setActiveFloor,
            }}>
                <div className="Tableview">
                    <div className='tableviewController'>
                        <Controlpanel
                            getTables={getTables}
                            createFloor={createFloor}
                            deleteFloor={deleteFloor}
                        />

                        <div className='tableContainer'>
                            {tableList
                                ? tableList.map((table) => {
                                    if (table.floor_id === activeFloor) {
                                        return <Table
                                            key={table.id}
                                            table={table}
                                        />
                                    } else { return null }

                                })
                                : <></>
                            }
                        </div>
                    </div>
                    <Tableinfo></Tableinfo>
                    <MainModal></MainModal>
                </div>
            </TableContext>
        </>
    )
}

export default Tableview;