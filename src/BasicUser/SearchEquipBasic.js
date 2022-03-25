import React, { useState, useEffect } from "react"; //STORE DATA
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
//import from datatable folder
import Datatable from "../datatable";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
es6.polyfill();
var BarcodeID = "";
//import SearchEquip from "./SearchEquip";
function SearchEquipBasic() {
    //default value [getter, setteer]

    const [data, setData] = useState([]);
    const [q, setQ] = useState(""); //query filter
    const [searchColumns, setSearchColumns] = useState(["serial_number", "equipment_status"]);
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
        <div>
            <form onSubmit={ScanBarcode}>
                <><BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                        if (result) {
                            const barcodeData = result.text
                            setBarcodeItem(barcodeData);
                            sessionStorage.setItem("barcode", JSON.stringify(barcodeData));
                        }
                    }} />
                </>
                <button type="submit" className="submitButton" >Search BARCODE</button>
            </form>
            <form>
                <p className="formTitle">{barcode_id}</p>
            </form>
            <div>
                <input
                    id="inpData"
                    name="DATA"
                    type='text'
                    placeholder="Search Manually"
                    value={q}
                    onChange={(e) => { setQ(e.target.value); BarcodeID = e.target.value; }}
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

export default SearchEquipBasic;