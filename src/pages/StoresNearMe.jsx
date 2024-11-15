import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import BackButton from "./BackButton";

import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useState } from "react";

const StoresNearMe = () => {
  // Array of store data
  const stores = [
    { id: 1, name: "Target", address: "16731 Coit Rd, Dallas, TX 75248" },
    { id: 2, name: "Walmart Supercenter", address: "425 Coit Rd, Plano, TX 75075" },
    { id: 3, name: "Kroger", address: "160 N Coit Rd, Richardson, TX 75080" }
  ];

  const [zipCode, setZipCode] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Checks whether user zip code input is valid
  const isValidZipCode = (code) => /^\d{5}$/.test(code);

  const handleSubmit = () => {
    if (isValidZipCode(zipCode)) {
      setShowResults(true);
    } else {
      alert("Please enter a valid 5-digit zip code.");
    }
  };


  return (
    <div>
      <BackButton/>
      <h1>Stores Near Me</h1>
      <br></br>
       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          style={{ backgroundColor: '#EADAFF', color: '#000' }}
          onClick={handleSubmit}>
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
          <p>Stores in your area</p>
          {stores.map((store, index) => (
          <Link key={index} to={`/find-stores/${store.id}`}>
            <Button
              color="secondary"
              style={{
                height: '85px',
                width: '350px',
                backgroundColor: '#EADAFF', 
                color: '#000',
                borderRadius: '10px',
                fontSize: '30px',
                paddingRight: '150px',
                paddingBottom: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginBottom: '15px',
                marginTop: '20px'
              }}
            >
              <span>{store.name}</span>
              <span style={{ fontSize: '15px', marginTop: '5px' }}>{store.address}</span>
            </Button>
          </Link>
        ))}
        </div>
        
      )}

    </div>
  );
};

export default StoresNearMe;