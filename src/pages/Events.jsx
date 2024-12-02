import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button} from "@nextui-org/react";
import { useState } from "react";
import BackButton from "./BackButton";
import {parseDate} from "@internationalized/date";

const Events = () => {
    const [selectedCultures, setSelectedCultures] = useState([]);
    const [zipCode, setZipCode] = useState(""); // Add state for zip code

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;  

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
        <BackButton />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Find an Event</h1>
          <div className="flex flex-col justify-between space-y-10">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingTop: "20px",
              }}
            >
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
              <p className="font-bold pb-2">Radius</p>
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
              <p className="font-bold pb-2">Date</p>
              <DateRangePicker
                label="Choose a date range"
                className="max-w-xs"
                defaultValue={{
                  start: parseDate(formattedDate),
                  end: parseDate(formattedDate),
                }}
              />
            </div>

            <div>
              <p className="font-bold pb-2">Select a culture</p>
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

            <div className="mt-auto flex justify-center">
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