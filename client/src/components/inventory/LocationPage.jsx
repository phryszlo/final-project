import LocationForm from "./LocationForm";
import LocationTable from "./LocationTable";
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/inventory.css';
import { getLocation } from '../../utilities/inventory-service';
import { LocationsContext } from '../../state/LocationsContext';
import { getLocations } from '../../utilities/inventory-service';

function LocationPage() {
  const {location, locations} = useContext(LocationsContext);
  const [currLoc, setCurrLoc] = location;
  const [locs, setLocs] = locations;


  useEffect(() => {


    const callGetLocations = async () => {
      try {
        const loc = await getLocations();
        setLocs(loc.locations);
      } catch (error) {
        console.log(`callLocations error: ${error}`);
      }
    }
    callGetLocations();
  }, []);


  useEffect(() => {
    console.log(`locpage euf: ${JSON.stringify(location)}`)
  }, [location]);

  return (
    <main className="location-page-main flex flex-col w-screen min-w-max justify-start items-center !pt-5 ">
      <h2 className="font-burtons text-lg !mb-2 text-teal-600">Locations Page</h2>
      <div className="flex">
        <LocationTable />
        <LocationForm />
      </div>
    </main>
  )
}

export default LocationPage