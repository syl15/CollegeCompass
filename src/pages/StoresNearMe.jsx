import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import BackButton from "./BackButton";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useState, useEffect } from "react";

const StoresNearMe = () => {
  const stores = [
    { id: 1, name: "Target", address: "16731 Coit Rd, Dallas, TX 75248", distance: 2.0 },
    { id: 2, name: "Walmart Supercenter", address: "425 Coit Rd, Plano, TX 75075", distance: 2.4 },
    { id: 3, name: "Kroger", address: "160 N Coit Rd, Richardson, TX 75080", distance: 3.7 },
  ];


  const [zipCode, setZipCode] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedZipCode = localStorage.getItem("zipCode"); 
    const savedShowResults = JSON.parse(localStorage.getItem("showResults")); 

    if (savedZipCode) setZipCode(savedZipCode); 
    if (savedShowResults) setShowResults(savedShowResults); 

    return () => {
      localStorage.removeItem("zipCode");
      localStorage.removeItem("showResults");
    }

  }, []);

  // Checks whether user zip code input is valid
  const isValidZipCode = (code) => /^\d{5}$/.test(code);

  const handleSubmit = () => {
    if (isValidZipCode(zipCode)) {
      localStorage.setItem("zipCode", zipCode);
      localStorage.setItem("showResults", true);
      setShowResults(true);
    } else {
      alert("Please enter a valid 5-digit zip code. Example: 75080");
    }
  };




  return (
    <div>
      <BackButton />
      <h1 className="text-4xl font-bold">Stores Near Me</h1>
      <br></br>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input
          placeholder="Enter zip code"
          className="w-full"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
            setShowResults(false); // Reset results on new input
          }}
        />
        <Button
          style={{ backgroundColor: "#EADAFF", color: "#000" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <br />

      <div>
        <p className="font-bold">Radius</p>
        <Slider
          label="Distance (miles)"
          step={1}
          maxValue={50}
          minValue={0}
          defaultValue={10}
          className="max-w-md"
          color="secondary"
        />
      </div>
      <br />

      {showResults && (
        <div>
          <p>Stores in your area. Select a store to learn more details</p>
          {stores.map((store, index) => (
            <Link key={index} to={`/find-stores/${store.id}`}>
              <Button
                color="secondary"
                style={{
                  height: "auto",
                  width: "350px",
                  backgroundColor: "#EADAFF",
                  color: "#000",
                  borderRadius: "10px",
                  fontSize: "30px",
                  paddingRight: "150px",
                  paddingBottom: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginBottom: "15px",
                  marginTop: "20px",
                }}
              >
                <span>{store.name}</span>
                <span style={{ fontSize: "15px", marginTop: "5px" }}>
                  {store.address}
                </span>
                <span style={{ fontSize: "15px", marginTop: "3px"}}>
                  Distance: {store.distance} miles
                </span>
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoresNearMe; 