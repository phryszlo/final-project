import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEqAndRelated } from '../../utilities/inventory-service';
import '../../styles/inventory.css';

function EqTable() {
  const [allEq, setAllEq] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const callGetAllEq = async () => {
      try {
        const eq = await getAllEqAndRelated();
        setAllEq(eq.equipment);
      } catch (error) {
        console.log(`callGetAllEq error: ${error}`);
      }
    }
    callGetAllEq();
  }, []);

  return (
    <div className="eq-table-component flex justify-center">
      <table className="eq-table w-4/5 h-full bg-slate-800  border border-slate-100">
        <thead>
          <tr className="bg-amber-400">
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1"></th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Building</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Room</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Status</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">IDTag</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Eq</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Make</th>
            <th className="text-left text-slate-900 border-b border-blue-300 !px-4 !py-1">Model</th>
          </tr>
        </thead>
        <tbody>
          {allEq && allEq.length > 0 && allEq.map((v, i) => {
            return (
              <tr key={i}>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td0-${i}`}>
                  <button type="button" onClick={() =>
                    navigate(`/equipment/${v.id}`)}>
                      view
                  </button>

                </td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td0-${i}`}>{v.location_id && v.location_id.building}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td1-${i}`}>{v.location_id && v.location_id.room}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td1-${i}`}>{v.status && v.status}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td1-${i}`}>{v.id_tag && v.id_tag}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td2-${i}`}>{v.model_id.eq_type}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td3-${i}`}>{v.model_id.make}</td>
                <td className="border-b border-blue-300 !px-4 !py-1" key={`td4-${i}`}>{v.model_id.model_name}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default EqTable;