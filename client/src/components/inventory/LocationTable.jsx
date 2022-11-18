import { useEffect } from 'react';
import { LocationsContextProvider } from '../../state/LocationsContext';

function LocationTable({ setLocation, allLocations, setAllLocations }) {

  useEffect(() => {
    console.log(`allLocations: ${JSON.stringify(allLocations)}`);
  }, []);
  
  return (
    <LocationsContextProvider>
      <div className="eq-table-component flex justify-center">
        <table className="eq-table w-4/5 h-full bg-slate-800  border border-slate-100">
          <thead>
            <tr className="bg-amber-600">
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1"></th>
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Building</th>
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Location</th>
              {/* <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Notes</th> */}
            </tr>
          </thead>
          <tbody>
            {allLocations && allLocations.length > 0 && allLocations.map((v, i) => {
              return (
                <tr key={i}>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`td0-${i}`}>
                    <button
                      className="!px-2 !py-1 bg-teal-400 rounded-lg text-blue-900"
                      type="button"
                      onClick={() => {
                        console.log(`click: ${JSON.stringify(v)}`);
                        setLocation(v);
                      }}
                    >
                      view
                    </button>

                  </td>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`loc-td1-${i}`}>{v.building && v.building}</td>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`loc-td2-${i}`}>{v.room && v.room}</td>
                  {/* <td
                  className="border-b border-blue-300 !px-4 !py-1 whitespace-normal max-w-lg"
                  key={`loc-td3-${i}`}>
                  {v.notes && v.notes}
                </td> */}
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </LocationsContextProvider>
  )
}

export default LocationTable;