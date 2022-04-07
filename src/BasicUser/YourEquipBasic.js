import React, { useState, useEffect } from "react";
import "../App2.css";
import axios from "axios";
import es6 from "es6-promise";
import "isomorphic-fetch";
import Datatable from "../datatable";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Navbar from "../components/NavBarPro";
import axios from 'axios';
import {useState, useEffect} from 'react';
es6.polyfill();
var BarcodeID = "";

function YourEquipBasic() {
    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState([ "end_date"]);
    const [user, setUser] = useState(null);
    const [barcode_id, setBarcodeItem] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
 
    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
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
    }, []);

    useEffect(() => {
        var email = sessionStorage.getItem('user_email')
        axios.get(`https://bgctrack.herokuapp.com/api/UserEquipQuery/${email}`)
            .then((response) => {
                return response.data.equips;
            })
            .then(function (myJson) {
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

    const ScanBarcode = async (e) => {
        e.preventDefault();
        try {
            const barcodeScan = localStorage.getItem("barcode");
            if (barcodeScan === "" || barcodeScan === null) {
                window.alert("Please display barcode clearly when scanning it in.")
            } else if (barcodeScan != null && barcodeScan != "") {
                setQ(barcodeScan.replaceAll('"', ''));
            }
        } catch (err) {
            console.log(err)
        }
    }

    const columns = data[0] && Object.keys(data[0]);
    return (
        <container>
            <Navbar />
            <div class="form-control">
                <button class="mt-3 mb-3 ms-1 btn btn-primary btn-lg btn-block" onClick={() => setIsOpen(true)}>Search Category</button>
                <input
                    id="inpData"
                    name="DATA"
                    type='text'
                    placeholder="Search"
                    class="form-control"
                    value={q}
                    onChange={(e) => { setQ(e.target.value); BarcodeID = e.target.value; }}
                />
                <Datatable data={search(data)} />
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
                <button class="mt-5 mb-3  ms-5 btn btn-success btn-lg btn-block" style={{ transform: "scale(2)" }} onClick={() => setIsOpen(false)}>Save</button>
            </Modal>

        </container>
    );
}

export default YourEquipBasic;