import React, { useState, useEffect } from "react"; //STORE DATA
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
//import from datatable folder//
import Datatable from "../datatable";
import Navbar from "../components/NavBarPro";
import Modal from "react-modal";

es6.polyfill();
var BarcodeID = "";
//import SearchEquip from "./SearchEquip";
function RequestEquipBasic() {
    //default value [getter, setteer]

    const [data, setData] = useState([]);
    const [userEquip, setuserEquip] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["barcode_id"]);
    const [user, setUser] = useState(null);
    const [barcode_id, setBarcodeItem] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);


    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken, accToken));
            setUser(JSON.parse(refToken, accToken));
            console.log(refToken);
            console.log(accToken);
        }
        const currentTime = new Date().getMinutes();
        const loginTime = sessionStorage.getItem("session-start");
        const sessionLimit = 20;
        if (currentTime && loginTime) {
            if ((currentTime - loginTime) > sessionLimit) {
                const res = axios.post("https://bgctrack.herokuapp.com/api/logout")
                setUser(res.data);
                sessionStorage.clear();
                window.location.reload();
            }
        }
        const checkForOverdueEquipment = async (e) => {
                    const current_date = new Date();
                    try {
                    axios.post("https://bgctrack.herokuapp.com/api/CheckForOverdueEquipment" ,{current_date});
                    }
                    catch (err) {
                       console.log(err);
                    }

                }
    }, []);
    function handleRequest() {
        var email = sessionStorage.getItem("user_email")
        var barcode_id = q;
        var status = sessionStorage.getItem("user_status")
        console.log(email);
        console.log(q);
        if (q == '') {
            window.alert("fill in the barcode of the wanted equipment")
        }
        else{
                axios.post(`https://bgctrack.herokuapp.com/api/RequestEquip`, { email, barcode_id, status })
                    .then((response) => {
                        window.location.reload();
                        return;
                    });
        }
    }


    function handleCancelRequest() {
        var email = sessionStorage.getItem("user_email")
        var barcode_id = q;
        console.log(email);
        console.log(q);
        if (q == '') {
            window.alert("fill in the barcode")
        }
        else{

                        axios.post(`https://bgctrack.herokuapp.com/api/CancelRequestEquip`, { email, barcode_id })

                    .then((response) => {
                        window.location.reload();
                        return;
                    });

        }

    }

    useEffect(() => {

        console.log(searchColumns)
        axios.get(`https://bgctrack.herokuapp.com/api/AvailableEquipmentQuery`)
            .then((response) => {

                return response.data.equips;
            })
            .then(function (myJson) {
                setData(myJson)
            });
        var email = sessionStorage.getItem("user_email")

        axios.post(`https://bgctrack.herokuapp.com/api/RequestedEquipmentQuery`, { email })
            .then((response) => {
                return response.data.equips;
            })
            .then(function (myJson) {
                setuserEquip(myJson)
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

    const checkForOverdueEquipment = async (e) => {
            const current_date = new Date();
            try {
            axios.post("https://bgctrack.herokuapp.com/api/CheckForOverdueEquipment" ,{current_date});
            }
            catch (err) {
               console.log(err);
            }

        }

    return (
        <container>
            <Navbar />
            <div class="">
                <div class="form-control">
                    <button class="ms-1 btn btn-primary btn-lg btn-block" onClick={() => setIsOpen(true)}>Search Category</button>
                    <input
                        id="inpData"
                        name="DATA"
                        type='text'
                        placeholder="Send or cancel request with barcode"
                        class="form-control mt-2 mb-4"
                        value={q}
                        onChange={(e) => { setQ(e.target.value); }}
                    />
                    <h3 class="mb-2">Available Equipments</h3>



                    <Datatable data={search(data)} />
                    <div class="mb-3 ms-3 mt-2" >
                        <button onClick={handleRequest} style={{ transform: "scale(1.3)" }} type="submit" class="btn btn-warning btn-lg btn-block">Request</button>
                    </div>
                    <div>
                        <h3 class="mb-2">Requested Equipments</h3>
                        <Datatable data={search(userEquip)} />
                        <div class="mb-3 ms-4 mt-2" >
                            <button onClick={handleCancelRequest} style={{ transform: "scale(1.3)" }} type="submit" class="btn btn-warning btn-lg btn-block">Cancel Request</button>
                        </div>
                    </div>

                </div>



                <Modal aria-labelledby="contained-modal-title-vcenter" isOpen={modalIsOpen}>
                    <table class="">
                        {columns &&
                            columns.map((column) => (
                                <tr>
                                    <label class="ms-5">
                                        <div class="mt-5 mb-4">
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

                                </tr>

                            ))}
                    </table>
                    <button class="mt-5  ms-5 btn btn-success btn-lg btn-block" style={{ transform: "scale(2)" }} onClick={() => setIsOpen(false)}>Save</button>
                </Modal>


            </div>
        </container>

    );
}

export default RequestEquipBasic;