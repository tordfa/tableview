import '../App.css';
import Table from './Table';
import Controlpanel from './Controlpanel';
import Tableinfo from './Tableinfo';
import * as tableController from "../controllers/tableController"
import { useState } from 'react';
import Newtablemodal from './Newtablemodal';

function Tableview() {

    const [tableList, setTableList] = useState(tableController.getTables())
    const [floors, setFloors] = useState(tableController.getFloors())
    const [isEdit, setIsEdit] = useState(false);
    const [activeTable, setActiveTable] = useState();
    const [activeFloor, setActiveFloor] = useState("0");


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