import React, { useState, useEffect } from "react"; //STORE DATA
import "../App2.css";
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
//import from datatable folder//
import Datatable from "../datatable";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Modal from "react-modal";
import Navbar from "../components/NavBarPro";
import {useState, useEffect} from 'react';
es6.polyfill();
var BarcodeID = "";

//import SearchEquip from "./SearchEquip";
function SearchEquipPro() {
    //default value [getter, setteer]

    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["equipment_barcode", "borrower"]);
    const [user, setUser] = useState(null);
    const [barcode_id, setBarcodeItem] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
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
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken, accToken));
            setUser(JSON.parse(refToken, accToken));
            console.log(refToken);
            console.log(accToken);
        }
    }, []);


    useEffect(() => {
        setData([])
        axios.get(`https://bgctrack.herokuapp.com/api/CheckInQuery`)
            .then((response) => {
                console.log(response.data.equips)
                console.log(data);
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

    function handleCheckIn() {
        axios.post(`https://bgctrack.herokuapp.com/api/checkIn`, { BarcodeID })
            .then((response) => {
                window.location.reload();
            });

    }
    
    function handleCleanStorage() {
        localStorage.setItem("barcode", "")
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
            <Form class="row" onSubmit={ScanBarcode}>
                <div class="mb-1 pr-5">
                    <BarcodeScannerComponent
                        width={300}
                        height={300}
                        onUpdate={(err, result) => {
                            if (result) {
                                const barcodeData = result.text
                                setBarcodeItem(barcodeData);
                                // addEntryClick();
                                localStorage.setItem("barcode", JSON.stringify(barcodeData));
                                // window.alert("This barcode was detected: " + sessionStorage.getItem("barcode"));
                            }
                        }} 
                    />
                </div>
                <div class="mb-2">
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit" style={{ transform: "scale(1.3)" }} class="btn btn-outline-success btn-lg btn-block">Search using Barcode</button>
                    </div>
                </div>
                <p class="h3" >Detected barcode: {barcode_id}</p>
            </Form>
            <div class="form-control" >
                <button class="mt-3 mb-3 ms-1 btn btn-primary btn-lg btn-block" onClick={() => setIsOpen(true)}>Search Category</button>
                <input
                        id="inpData"
                        name="DATA"
                        type='text'
                        placeholder="use barcode to check in"
                        class="form-control"
                        value={q}
                        onChange={(e) => { setQ(e.target.value); BarcodeID = e.target.value; }}
                    />
                <Datatable data={search(data)} />
                <div class="mt-5 mb-4 ms-3">
                    <button onClick={handleCheckIn} style={{ transform: "scale(1.3)" }} type="submit" class="btn btn-success btn-lg btn-block">Check in</button>
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



        </container>
    );
}

export default SearchEquipPro;