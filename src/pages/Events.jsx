import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button} from "@nextui-org/react";
import { useState } from "react";
import BackButton from "./BackButton";

const Events = () => {
    const [selectedCultures, setSelectedCultures] = useState([]);
    const [zipCode, setZipCode] = useState(""); // Add state for zip code

    const cultures = [
        { value: "chinese", label: "Chinese 🇨🇳" },
        { value: "spanish", label: "Spanish 🇪🇸" },
        { value: "argentinian", label: "Argentinian 🇦🇷" },
        { value: "mongolian", label: "Mongolian 🇲🇳" },
        { value: "french", label: "French 🇫🇷" },
        { value: "indian", label: "Indian 🇮🇳" },
        { value: "korean", label: "Korean 🇰🇷" }
    ];
    
    const handleCultureToggle = (culture) => {
        setSelectedCultures((prev) => 
            prev.includes(culture) 
                ? prev.filter((c) => c !== culture) 
                : [...prev, culture]
        );
    };

    
      // Checks whether user zip code input is valid
      const isValidZipCode = (code) => /^\d{5}$/.test(code);

      // Validates zip code and navigates to events-near-me
      const handleSubmit = () => {
        if (!isValidZipCode(zipCode)) {
          alert("Please enter a valid 5-digit zip code. Example: 75080");
          return;
        }

        window.location.href = `/events/events-near-me?cultures=${selectedCultures}`
      }


    return (
      <>
      <BackButton/>
      <div className="flex flex-col h-screen">
        <h1>Find an Event</h1>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] p-4 space-y-5">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
          <Input 
            placeholder="Enter zip code" 
            className="w-full" 
            value={zipCode} 
            onChange={(e) => {
              setZipCode(e.target.value);
            }} 
          />
      </div>
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

          <div>
            <p className="font-bold">Date</p>
            <DateRangePicker label="Choose a date range" className="max-w-xs" />
          </div>

          <div>
            <p className="font-bold">Select a culture</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {cultures.map((culture) => (
                <Button
                  key={culture.value}
                  onClick={() => handleCultureToggle(culture.value)}
                  style={{
                    backgroundColor: selectedCultures.includes(culture.value)
                      ? "#EADAFF"
                      : "#f9f9f9",
                    color: selectedCultures.includes(culture.value)
                      ? "#000"
                      : "#666",
                    border: "1px solid #ccc",
                    margin: "0 4px",
                  }}
                >
                  {culture.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex justify-left pb-20">
            <Button
              auto
              onClick={handleSubmit}
              style={{ backgroundColor: "#EADAFF", color: "#000" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      </>
    );
}

export default Events;