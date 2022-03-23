import React, { useState, useEffect } from "react"; //STORE DATA
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
//import from datatable folder
import Datatable from "./datatable";
es6.polyfill();


//import SearchEquip from "./SearchEquip";
function SearchEquip() {
    //default value [getter, setteer]

    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["serial_number", "equipment_status"]);
    const [l, setL] = useState("");
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");


    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken, accToken));
            setUser(JSON.parse(refToken, accToken));
            console.log(refToken);
            console.log(accToken);
        }
    }, []);


    useEffect(() => {
        axios.get(`/GeneralEquipmentQuery`)

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


    // document.body.style.backgroundColor = "#23272A";





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


        (sessionStorage.getItem("user_status") == "a") ? (
            <div>
                <div>
                    <input
                        type='text'
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    {columns &&
                        columns.map((column) => (
                            <label>
                                <input
                                    type='checkbox'
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
                                {column}
                            </label>
                        ))}
                </div>
                <div>
                    <Datatable data={search(data)} />
                </div>
            </div>
        ) : ((sessionStorage.getItem("user_status") != null) ? (
            <div>
                <div>
                    <input
                        type='text'
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    {columns &&
                        columns.map((column) => (
                            <label>
                                <input
                                    type='checkbox'
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
                                {column}
                            </label>
                        ))}
                </div>
                <br>
                </br>
                <br>
                </br>
                <div>
                    <Datatable data={search(data)} />
                </div>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <Link to="/" className="link">Go back</Link>
            </div>) : (<Navigate to="/" replace={true} />)
        )

    );
}

export default SearchEquip;