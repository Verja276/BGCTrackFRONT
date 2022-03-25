import React, { useState, useEffect } from "react"; //STORE DATA
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
//import from datatable folder
import Datatable from "../datatable";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Form from 'react-bootstrap/Form';
es6.polyfill();
var BarcodeID = "";
//import SearchEquip from "./SearchEquip";
function SearchEquipBasic() {
    //default value [getter, setteer]

    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["barcode_id", "equipment_status"]);
    const [user, setUser] = useState(null);
    const [barcode_id, setBarcodeItem] = useState("");


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
        axios.get(`https://bgctrack.herokuapp.com/api/GeneralEquipmentQuery`)
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

    const ScanBarcode = async (e) => {
        e.preventDefault();
        try {
            const barcodeScan = sessionStorage.getItem("barcode");
            if (barcodeScan === "" || barcodeScan === null) {
                window.alert("Please display barcode clearly when scanning it in.")
            } else if (barcodeScan != null && barcodeScan != "") {
                setQ(barcodeScan.replaceAll('"', ''));
            }
        } catch (err) {
            console.log(err)
        }
    }
    const inputBarcode = async (e) => {
        // e.preventDefault;
        if (barcode_id) {

        } else {
            window.alert("Some missing field!")
           }

    }
    const search_barcode = ({ barcode_id }) => <form onSubmit={inputBarcode}></form>
    const columns = data[0] && Object.keys(data[0]);
    return (
        <container>
            <Form class="row" onSubmit={ScanBarcode}>
                <div class="mb-1 pr-5">
                    <><BarcodeScannerComponent
                        width={500}
                        height={500}
                        onUpdate={(err, result) => {
                            if (result) {
                                const barcodeData = result.text
                                setBarcodeItem(barcodeData);
                                // addEntryClick();
                                sessionStorage.setItem("barcode", JSON.stringify(barcodeData));
                                // window.alert("This barcode was detected: " + sessionStorage.getItem("barcode"));
                            }
                        }} />
                    </>
                    
                </div>
                <div class="mb-2">
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit" style={{ transform: "scale(1.3)" }} class="btn btn-outline-success btn-lg btn-block">Search using Barcode</button>
                    </div>
                </div>
                <p class="h3" >Detected barcode: {barcode_id}</p>
            </Form>
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
                        onChange={(e) => { setQ(e.target.value); BarcodeID = e.target.value; }}
                    />
                    <Datatable data={search(data)} />
                </div>
                <div class="m-3">
                    <Link to="/"  style={{ transform: "scale(1.3)" }} class="btn btn-outline-danger btn-lg btn-block"> Go back </Link>
                </div>

            </div>
        </container>

    );
}

export default SearchEquipBasic;