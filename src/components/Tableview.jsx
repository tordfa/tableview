import '../App.css';
import Table from './Table';
import Controlpanel from './Controlpanel';
import Tableinfo from './Tableinfo';
import * as tableController from "../controllers/tableController"
import { useEffect, useState } from 'react';
import MainModal from './modals/MainModal';

function Tableview() {

    const [tableList, setTableList] = useState(null)
    const [floors, setFloors] = useState(null)
    const [isEdit, setIsEdit] = useState(false);
    const [activeTable, setActiveTable] = useState();
    const [activeFloor, setActiveFloor] = useState(null);


    async function getTables() {
        try {
            let tables = await tableController.getTables();
            setTableList(tables);
        }
        catch (e) { console.error(e); }
    }

    async function createFloor(name_input) {
        try {
            let result = await tableController.createFloor({ name: name_input })
            let newArray = [...floors, result];
            setFloors(newArray);
        }
        catch (e) {
            console.error(e);
        }

    }
    // Getting Floors and tables from DB
    useEffect(() => {
        getTables();

        (async () => {
            try {
                let newfloors = await tableController.getFloors();
                console.log(newfloors[0].id);
                setActiveFloor(newfloors[0].id)
                setFloors(newfloors);
            }
            catch (e) { console.error(e); }
        })();


    }, [])


    return (
        <>
            <div className="Tableview">
                <div className='tableviewController'>
                    <Controlpanel
                        getTables={getTables}
                        createFloor={createFloor}
                        tableList={tableList}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        floors={floors}
                        setActiveFloor={setActiveFloor}
                        activeFloor={activeFloor}
                    />

                    <div className='tableContainer'>
                        {tableList
                            ? tableList.map((table) => {
                                if (table.floor === activeFloor) {
                                    return <Table
                                        key={table.id}
                                        xPos={table.x}
                                        yPos={table.y}
                                        isEdit={isEdit}
                                        tableList={tableList}
                                        setTableList={setTableList}
                                        table={table}
                                        setActiveTable={() => { setActiveTable(table) }}
                                        activeTable={activeTable}
                                    />
                                } else { return null }

                            })
                            : <></>
                        }
                    </div>
                </div>
                <Tableinfo activeTable={activeTable}></Tableinfo>
                <MainModal setTableList={setTableList} tableList={tableList} activeFloor={activeFloor}></MainModal>
            </div>
        </>)
}

export default Tableview;