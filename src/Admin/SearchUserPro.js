import React, { useState, useEffect } from "react"; //STORE DATA
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
//import from datatable folder
import Datatable from "../datatable";
import App from "../App";
es6.polyfill();


//import SearchEquip from "./SearchEquip";
function SearchUserPro() {
    //default value [getter, setteer]
    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["user_name", "user_id"]);
    const [l, setL] = useState("");
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");


    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);


    useEffect(() => {
        axios.get(`https://bgctrack.herokuapp.com/api/GeneralUsersQuery`)

            .then((response) => {
                console.log(response.data.equips)
                console.log(data);
                return response.data.equips;
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }, []);

    function search(rows) {

        return rows.filter((row) =>
            searchColumns.some(
                (column) =>
                    row[column]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1,
            ),
        );
    }
    const columns = data[0] && Object.keys(data[0]);
    return (
        <div>
            <div>
                <div class="form-control">
                    {columns &&
                        columns.map((column) => (
                            <label class="ms-5">
                                <div class="mt-3 mb-4">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            style={{ transform: "scale(3)" }}
                                            id="flexSwitchCheckDefault"
                                            checked={searchColumns.includes(column)}
                                            onChange={(e) => {
                                                const checked = searchColumns.includes(column);
                                                setSearchColumns((prev) =>
                                                    checked
                                                        ? prev.filter((sc) => sc !== column)
                                                        : [...prev, column],
                                                );
                                            }}
                                        />
                                        <div class="ms-5">
                                            <label class="h3" for="flexSwitchCheckDefault">{column}</label>
                                        </div>
                                    </div>
                                </div>

                            </label>
                        ))}
                    <div class="form-control">
                        <input
                            id="inpData"
                            name="DATA"
                            type='text'
                            placeholder="Search Manually, To delete search with barcode id"
                            class="form-control"
                            value={q}
                            onChange={(e) => { setQ(e.target.value); }}
                        />
                        <Datatable data={search(data)} />
                    </div>
                    <div class="m-3">
                        <Link to="/" style={{ transform: "scale(1.3)" }} class="btn btn-outline-danger btn-lg btn-block"> Go back </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default SearchUserPro;