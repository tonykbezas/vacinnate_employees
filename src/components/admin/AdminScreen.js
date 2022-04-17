import { Navbar } from "../navbar/Navbar"
import { ListEmploye } from "./ListEmploye"
import { NavLink } from "react-router-dom";

export const AdminScreen = () => {
    const updateData = () => {};
    const deleteData = () => {};
    return (
        <>
        <h1> AdminScreen</h1>
        <Navbar/>
            <div>
                <NavLink
                      className="btn btn-primary"
                      to="/signup_employe"
                    >
                    Registrar empleado nuevo
                </NavLink>
            </div>
            <ListEmploye/>
        </>
    )
}