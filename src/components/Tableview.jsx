import '../App.css';
import Table from './Table';
import Controlpanel from './Controlpanel';
import Tableinfo from './Tableinfo';
import * as tableController from "../controllers/tableController"
import { useEffect, useState } from 'react';
import Newtablemodal from './Newtablemodal';

function Tableview() {

    const [tableList, setTableList] = useState(null)
    const [floors, setFloors] = useState(null)
    const [isEdit, setIsEdit] = useState(false);
    const [activeTable, setActiveTable] = useState();
    const [activeFloor, setActiveFloor] = useState(null);

    // Getting Floors and tables from DB
    useEffect(() => {
        (async () => {
            try {
                let newfloors = await tableController.getFloors();
                console.log(newfloors[0].id);
                setActiveFloor(newfloors[0].id)
                setFloors(newfloors);
            }
            catch (e) {console.error(e);}
        })();
        (async () => {
            try {
                let tables = await tableController.getTables();
                setTableList(tables);
            }
            catch(e){ console.error(e); }
            
        })();


    }, [])


    return (
        <>
            <div className="Tableview">
                <div className='tableviewController'>
                    <Controlpanel
                        setTableList={setTableList}
                        tableList={tableList}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        floors={floors}
                        setFloors={setFloors}
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
                <Newtablemodal setTableList={setTableList} tableList={tableList} activeFloor={activeFloor}></Newtablemodal>
            </div>
        </>)
}

export default Tableview;