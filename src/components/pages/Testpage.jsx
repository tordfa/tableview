import { testDbSelect } from "../../controllers/tableController"

export const Testpage = () => {

    const handleClick = async () => {
        console.log( await testDbSelect());

    }


    return (
        <>
            <div>
                <h1>Testpage</h1>
                <button onClick={handleClick}>TEST</button>

            </div>
        </>

    )
}
