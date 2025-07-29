import { createTenant } from "../../controllers/userController"
export const Settings = () => {
  return (
    <div>
        <h1>Settings</h1>
        <button onClick={()=>{createTenant("tenantname","tenanturl")}} className="border border-solid border-black rounded-md">Create Tenant</button>
    </div>
  )
}
