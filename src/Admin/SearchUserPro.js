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
        </div>

    );
}

export default SearchUserPro;