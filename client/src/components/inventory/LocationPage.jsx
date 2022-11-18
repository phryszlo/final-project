import LocationForm from "./LocationForm";
import LocationTable from "./LocationTable";
import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/inventory.css';
import { getLocations, getLocation } from '../../utilities/inventory-service';



function LocationPage() {
  const [location, setLocation] = useState({});
  const [allLocations, setAllLocations] = useState([]);

  const paramsId = useParams();

  useEffect(() => {
    const callGetLocation = async () => {
      const eq = await getLocation(paramsId.id);
      setLocation(eq);
    }

    // get a location for the form only if there is an id param.
    if (Object.keys(paramsId).length > 0) {
      console.log(`paramsId: ${JSON.stringify(paramsId)}`);
      callGetLocation();
    }

    const callGetLocations = async () => {
      try {
        const loc = await getLocations();
        setAllLocations(loc.locations);
      } catch (error) {
        console.log(`callLocations error: ${error}`);
      }
    }
    callGetLocations();

  }, [])

  useEffect(() => {
    console.log(`locpage euf: ${JSON.stringify(location)}`)
  }, [location]);

  return (
    <main className="location-page-main flex flex-col w-screen min-w-max justify-start items-center !pt-5 border">
      <h2 className="font-burtons text-lg !mb-2 text-teal-600">Locations Page</h2>
      <div className="flex">
        <LocationTable allLocations={allLocations} setLocation={() => setLocation} setAllLocations={setAllLocations} />
        <LocationForm location={location} />
      </div>
    </main>
  )
}

export default LocationPage