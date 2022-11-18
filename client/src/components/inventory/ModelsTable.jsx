import { useEffect, useContext } from 'react';
import {ModelsContext} from '../../state/ModelsContext';
import { useNavigate} from 'react-router-dom';

function ModelsTable() {

  const {model, models} = useContext(ModelsContext);
  const [currMod, setCurrMod] = model;
  const [mods, setMods] = models;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`models: ${JSON.stringify(mods)}`);
  }, []);

  return (
      <div className="eq-table-component flex justify-center">
        <table className="eq-table w-4/5 h-full bg-slate-800  border border-slate-100">
          <thead>
            <tr className="bg-amber-600">
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1"></th>
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Make</th>
              <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Model name</th>
              {/* <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Notes</th> */}
            </tr>
          </thead>
          <tbody>
            {mods && mods.length > 0 && mods.map((v, i) => {
              return (
                <tr key={i}>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`td0-${i}`}>
                    <button
                      className="!px-2 !py-1 bg-teal-400 rounded-lg text-blue-900"
                      type="button"
                      onClick={() => {
                        console.log(`click: ${JSON.stringify(v)}`);
                        setCurrMod(v);
                        navigate(`/model/${v.id}`)
                      }}
                    >
                      view
                    </button>

                  </td>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`loc-td1-${i}`}>{v.make && v.make}</td>
                  <td className="border-b border-blue-300 !px-4 !py-1" key={`loc-td2-${i}`}>{v.model_name && v.model_name}</td>
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
  )
}

export default ModelsTable;