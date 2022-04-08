import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "./background5.jpg";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
//import Signup from "./Signup";

function BarcodeScan() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    const [barcode_id, setBarcodeItem] = useState("");
    const [theArray, setTheArray] = useState([]);
    const [serial_number, setSerialNumber] = useState("");
    const [equipment_type, setEquipmentType] = useState("");
    const [category, setCategory] = useState("");
    const [project, setProject] = useState("");
    const [equipment_status, setEquipmentStatus] = useState("");
    const [equipment_group, setEquipmentGroup] = useState("");
    const [location, setLocation] = useState("");

    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);

    // const addEntryClick = () => {
    //     if (barcodeScan != null && barcodeScan != "") {
    //         setTheArray(theArray => [...theArray, barcodeScan]);
    //     }

    // }

    const ScanBarcode = async (e) => {
        e.preventDefault();
        try {
            const barcodeScan = sessionStorage.getItem("barcode");
            if (barcodeScan === "" || barcodeScan === null) {
                window.alert("Please display barcode clearly when scanning it in.")
            } else if (barcodeScan != null && barcodeScan != "") {
                setTheArray(theArray => [...theArray, barcodeScan]);
                //Add barcode to the database.

                // window.alert("Barcode is: " + barcodeScan);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const inputBarcode = async (e) => {
        e.preventDefault();
        if (barcode_id, serial_number, equipment_type, category, project, equipment_status, equipment_group, email, location) {
            const borrower = email;
            const res = await axios.post("https://bgctrack.herokuapp.com/api/addEquipment", { barcode_id, serial_number, equipment_type, category, project, equipment_status, equipment_group, borrower, location });
            //const res = await axios.post("/addEquipment",{barcode_id});
            setUser(res.data);
            window.alert("sent equipment to database!");
        } else {
            window.alert("Some missing field!")
        }

    }


    const ClearBarcode = async (e) => {
        e.preventDefault();
        try {
            const undesiredBarcode = sessionStorage.getItem("barcode");
            if (undesiredBarcode) {
                sessionStorage.removeItem("barcode");
                sessionStorage.setItem("barcode", "");
                setData("");
                window.alert("Detected barcode cleared.")
            } else {
                window.alert("No detected barcode to remove.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleGoToBarcodeScan = async (e) => {
        <barcodescan />
    };


    document.body.style.backgroundColor = "#23272A";

    const Search = ({ barcode_id }) => <form onSubmit={inputBarcode}></form>

    return (
        <div className="container" >
            <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} >
                <div className="form1">

                    <span className="formTitle" >SCAN BARCODE</span>
                    <br></br>
                    <br></br>
                    <form onSubmit={ScanBarcode}>
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

                                else {
                                    // setBarcodeItem("");
                                }
                            }} />
                        </>

                        <br></br>
                        <button type="submit" className="submitButton" >CONFIRM BARCODE</button>
                        <br>
                        </br>
                    </form>
                    <br></br>
                    <form onSubmit={ClearBarcode}>
                        <p>Clear the detected barcode: {barcode_id}</p>
                        <br></br>
                        <button type="submit" className="submitButton">CLEAR BARCODE</button>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
                    </form>
                    <ul className="previousSearch">
                        {theArray.map((barcode_id, i) => (
                            <Search
                                barcode_id={barcode_id}
                                // Prevent duplicate keys by appending index:
                                key={barcode_id + i}
                            />
                        ))}
                    </ul>

                    <br>
                    </br><br>
                    </br><br>
                    </br><br>
                    </br><br>
                    </br><br>
                    </br>
                    <Link to="/" className="link">Go back</Link>


                    <br></br>
                    <br></br>
                    <br></br>

                    <form onSubmit={inputBarcode}>
                        <input
                            type="text"
                            value={barcode_id}
                            onChange={(barcode_id) => setBarcodeItem(barcode_id.target.value)} />
                        <input
                            type="text"
                            placeholder="serial_number"
                            value={serial_number}
                            onChange={(e) => setSerialNumber(e.target.value)} />
                        <input
                            type="text"
                            placeholder="equipment_type"
                            onChange={(e) => setEquipmentType(e.target.value)} />
                        <input
                            type="text"
                            placeholder="category"
                            onChange={(e) => setCategory(e.target.value)} />
                        <input
                            type="text"
                            placeholder="project"
                            onChange={(e) => setProject(e.target.value)} />
                        <input
                            type="text"
                            placeholder="equipment_status"
                            onChange={(e) => setEquipmentStatus(e.target.value)} />
                        <input
                            type="text"
                            placeholder="equipment_group"
                            onChange={(e) => setEquipmentGroup(e.target.value)} />
                        <input
                            type="text"
                            placeholder="borrower"
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="text"
                            placeholder="location"
                            onChange={(e) => setLocation(e.target.value)} />

                        <button type="submit" className="submitButton" >Submit BARCODE</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default BarcodeScan;