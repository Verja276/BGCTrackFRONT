import React, {useState, useEffect} from "react"; //STORE DATA
import "./App.css";
import axios from "axios";
import {Link} from "react-router-dom";
import es6 from "es6-promise";
import "isomorphic-fetch";
//import from datatable folder
import Datatable from "./datatable";
es6.polyfill();

//import SearchEquip from "./SearchEquip";
function SearchEquip() {
    //default value [getter, setteer]

    const[data, setData] = useState([]);
    const[q, setQ]=useState(""); //query filter
    const[searchColumns, setSearchColumns] = useState(["ID","Name"]); 
    const[l, setL ]= useState("");
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken,accToken));
          setUser(JSON.parse(refToken,accToken));
          console.log(refToken);
          console.log(accToken);
        }
    }, []);


    useEffect(()=> {
        axios.get(`https://bgctrack.herokuapp.com/api/GeneralEquipmentQuery`)
        
        .then((response)=>{
          console.log(response.data.equips)
          console.log(data);
          return response.data.equips;
        })
        .then(function(myJson) {
          console.log(myJson);
          setData(myJson)
        });

    }, []);


    // document.body.style.backgroundColor = "#23272A";

    //columns will be ID, Name, Location, User, SignedOut, Status
     
    function search(rows){


        return rows.filter(
            (row) => 
           (row.barcode_id.toString().toLowerCase().indexOf(q) > -1 && row.barcode_id.toString().toLowerCase().indexOf(l) > -1)  ||
           (row.borrower.toString().toLowerCase().indexOf(q) > -1 && row.borrower.toString().toLowerCase().indexOf(l) > -1) ||
           (row.category.toString().toLowerCase().indexOf(q) > -1 && row.category.toString().toLowerCase().indexOf(l) > -1)  ||
           (row.database_id.toString().toLowerCase().indexOf(q) > -1 && row.database_id.toString().toLowerCase().indexOf(l) > -1) ||
           (row.equipment_group.toString().toLowerCase().indexOf(q) > -1 && row.equipment_group.toString().toLowerCase().indexOf(l) > -1
           ||
           (row.equipment_type.toString().toLowerCase().indexOf(q) > -1 && row.equipment_type.toString().toLowerCase().indexOf(l) > -1) 
           
           ||
           (row.project.toString().toLowerCase().indexOf(q) > -1 && row.project.toString().toLowerCase().indexOf(l) > -1) 
           ||
           (row.equipment_status.toString().toLowerCase().indexOf(q) > -1 && row.equipment_status.toString().toLowerCase().indexOf(l) > -1) 
        //    ||
        //    (row.equipment_location.toString().toLowerCase().indexOf(q) > -1 && row.equipment_location.toString().toLowerCase().indexOf(l) > -1) 
           )

        //    (row.barcode_id.toString().toLowerCase().indexOf(q) > -1)      ||
        //    (row.borrower.toString().toLowerCase().indexOf(q) > -1)        ||
        //    (row.category.toString().toLowerCase().indexOf(q) > -1)      ||
        //    (row.database_id.toString().toLowerCase().indexOf(q) > -1) ||
        //    (row.equipment_group.toString().toLowerCase().indexOf(q) > -1)

        );
    }

    return (
        <>

        <input type ="text" placeholder = "Search..." value ={q} onChange={(e) =>  setQ (e.target.value)} />
        <div>
        </div>
        <div>
            <Datatable data = {search(data)} />
        </div>
        </>

    );
}

export default SearchEquip;