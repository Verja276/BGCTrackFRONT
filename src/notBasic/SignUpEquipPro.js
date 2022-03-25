import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../background5.jpg";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


//import Signup from "./Signup";

function SignUpEquipPro() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");
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


    const ScanBarcode = async (e) => {
        e.preventDefault();

        try {
            const barcodeScan = sessionStorage.getItem("barcode");
            if (barcodeScan === "" || barcodeScan === null) {
                window.alert("Please display barcode clearly when scanning it in.")
            } else if (barcodeScan != null && barcodeScan != "") {
                setTheArray(theArray => [...theArray, barcodeScan]);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const signUpEquipment = async (e) => {
        e.preventDefault();
        if (barcode_id, serial_number, equipment_type, category, project, equipment_status, equipment_group, location) {
            const res = await axios.post("https://bgctrack.herokuapp.com/api/addEquipment", { barcode_id, serial_number, equipment_type, category, project, equipment_status, equipment_group, location }).catch(
                window.alert("It's Already added")
            );
            setUser(res.data);
            window.alert("sent equipment to database!");
        } else {
            window.alert("Some missing field!")
        }

    }





    return (
        <container>
            <div class="align-items-center">
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
                    <p class="h1" >Detected barcode: {barcode_id}</p>

                    
                </Form>
            </div>


            <Form class="align-items-center" onSubmit={signUpEquipment}>
                <Form.Group class="form-control" >
                    <Form.Label>Barcode</Form.Label>
                    <input
                        type="text"
                        value={barcode_id}
                        onChange={(barcode_id) => setBarcodeItem(barcode_id.target.value)}
                        placeholder="Barcode id"
                        class="form-control"
                        id="barcode" />
                    <Form.Label>Serial number</Form.Label>
                    <input
                        type="text"
                        placeholder="serial number"
                        class="form-control"
                        value={serial_number}
                        onChange={(e) => setSerialNumber(e.target.value)} />
                    <Form.Label>Equipment Type</Form.Label>
                    <input
                        type="text"
                        placeholder="equipment type"
                        class="form-control"
                        onChange={(e) => setEquipmentType(e.target.value)} />
                    <Form.Label>Category</Form.Label>
                    <input
                        type="text"
                        placeholder="category"
                        class="form-control"
                        onChange={(e) => setCategory(e.target.value)} />
                    <Form.Label>Project</Form.Label>
                    <input
                        type="text"
                        placeholder="project"
                        class="form-control"
                        onChange={(e) => setProject(e.target.value)} />
                    <Form.Label>Status</Form.Label>
                    <select id="roles" multiple name="role" onChange={(e) => setStatus(e.target.value)} class="form-control">
                        <option value="Available">Available</option>
                        <option value="Lost">Lost</option>
                        <option value="Checked out">Checked out</option>
                        <option value="Retired">Retired</option>
                    </select>
                    <Form.Label>Equipment Group</Form.Label>
                    <input
                        type="text"
                        placeholder="equipment group"
                        onChange={(e) => setEquipmentGroup(e.target.value)}
                        class="form-control" />
                    <Form.Label>Location</Form.Label>
                    <select id="sel1" multiple name="role" class="form-control" onChange={(e) => setLocation(e.target.value)}>
                        <option value="Vancouver">Vancouver</option>
                        <option value="Kamloops">Kamloops</option>
                        <option value="Calgary">Calgary</option>
                        <option value="Edmonton">Edmonton</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Ottawa">Ottawa</option>
                        <option value="Halifax">Halifax</option>
                        <option value="Victoria">Victoria</option>
                    </select>

                    <div class="mb-1 mt-3">
                        <div class="d-flex justify-content-center align-items-center">
                            <button type="submit" class="btn btn-outline-success btn-lg btn-block">Add Equipment</button>
                        </div>
                    </div>
                    <div class="mb-3 mt-3">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="row">
                            <Link to="/" class="btn btn-outline-success btn-lg btn-block"> Go back </Link>
                            </div>

                        </div>
                    </div>

                </Form.Group>
            </Form>
            
        </container>
    );
}





export default SignUpEquipPro;