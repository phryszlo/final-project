import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../styles/inventory.css';
import { getModels, getLocations, getEq, insertEq, updateEq } from "../../utilities/inventory-service";

const EquipmentForm = () => {

  const [showModelSelect, setShowModelSelect] = useState(false);
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [models, setModels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currEq, setCurrEq] = useState({});
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const [isUpdate, setIsUpdate] = useState(true);
  const navigate = useNavigate();

  const paramsId = useParams();
  console.log(`paramsId=${JSON.stringify(paramsId)}`)

  useEffect(() => {
    const callGetModels = async () => {
      const models = await getModels();
      setModels(models.models);
    }
    const callGetLocations = async () => {
      const locs = await getLocations();
      setLocations(locs.locations);
    }

    const callGetEq = async () => {
      const eq = await getEq(paramsId.id);
      setFormikVals(eq);
      setCurrEq(eq);

    }
    if (Object.keys(paramsId).length > 0) {
      console.log(`paramsId: ${JSON.stringify(paramsId)}`);
      callGetEq();
    }

    callGetModels();
    callGetLocations();
    console.log(`formik errs: ${JSON.stringify(formik.errors)}`);

  }, [])

  // this is a hack. the data was not displaying on first load, though it was there.
  // i don't know why this even works. without the call to setFormikVals in the useEffect[],
  // this currEq effect alone doesn't work. and vice/versa.
  useEffect(() => {
    setFormikVals(currEq);
  }, [currEq])

  const setFormikVals = (eq) => {
    console.log(`setFormikVals: ${JSON.stringify(eq)}`)
    if (Object.keys(eq).length > 0) {
      console.log(`eq len=${Object.keys(eq).length}`)
      formik.values.id = eq.id ? eq.id : "";
      formik.values.serial_number = eq.serial_number ? eq.serial_number : "";
      formik.values.id_tag = eq.id_tag ? eq.id_tag : "";
      formik.values.status = eq.status ? eq.status : "";
      formik.values.notes = eq.notes ? eq.notes : "";
      formik.values.location_id = eq.location_id._id ? eq.location_id._id : "";
      formik.values.model_id = eq.model_id._id ? eq.model_id._id : "";
      formik.values.eq_type = eq.model_id.eq_type ? eq.model_id.eq_type : "";
      formik.values.make = eq.model_id.make ? eq.model_id.make : "";
      formik.values.model_name = eq.model_id.model_name ? eq.model_id.model_name : "";
      formik.values.building = eq.location_id.building ? eq.location_id.building : "";
      formik.values.room = eq.location_id.room ? eq.location_id.room : "";
    }
  }

  const formik = useFormik({



    initialValues: {
      id: null,
      serial_number: currEq.serial_number ? currEq.serial_number : "",
      id_tag: "",
      status: "Inactive",
      notes: "",
      location_id: "",
      model_id: "",
      model_name: "",
      make: "",
      eq_type: "",
      building: "",
      room: "",
    },


    validationSchema: Yup.object({
      serial_number: Yup.string()
        .required("serial_number is required"),
      id_tag: Yup.string()
        .max(10, "id_tag cannot be longer than 10 chars/digits"),
      model_id: Yup.string()
        .required("model must be selected")
    }),

    onSubmit: (values) => {
      console.log(values);
      // 
      const eq = {
        serial_number: formik.values.serial_number,
        id_tag: formik.values.id_tag,
        status: formik.values.status,
        notes: formik.values.notes,
        model_id: formik.values.model_id,
        location_id: formik.values.location_id
      }
      isUpdate ? updateEq(formik.values.id, eq) : insertEq(eq);
      // router.push({ pathname: '/success', query: values })
    },

    onReset: () => {
      formik.values = ({ ...formik.initialValues });
      console.log(`reset was called`);
    }
  })



  useEffect(() => {
    if (Object.keys(selectedModel).length > 0) {
      console.log(`eq_type = ${selectedModel.eq_type}`)
      formik.values.eq_type = selectedModel.eq_type && selectedModel.eq_type;
      formik.values.model_id = selectedModel._id && selectedModel._id;
      formik.values.make = selectedModel.make && selectedModel.make;
      formik.values.model_name = selectedModel.model_name && selectedModel.model_name;
    }
  }, [selectedModel])

  useEffect(() => {
    if (Object.keys(selectedLocation).length > 0) {
      console.log(`room = ${selectedLocation.room}`)
      formik.values.building = selectedLocation.building && selectedLocation.building;
      formik.values.location_id = selectedLocation._id && selectedLocation._id;
      formik.values.room = selectedLocation.room && selectedLocation.room;
    }
  }, [selectedLocation])


  const clearData = () => {
    console.log(`clear data.`)
    setCurrEq(new Object());
    formik.resetForm();

    // formik.setValues({ ...formik.initialValues });
  }

  return (
    <main className="equipment-form-component !w-screen absolute top-0 
                    left-0 flex flex-col justify-start items-center !mt-24 px-5 bg-slate-700">
      <form
        onSubmit={formik.handleSubmit}
        className="equipment-form border-2 bg-stone-100 rounded-md h-fit w-2/3 p-3 !mt-14">
        <div className="text-gray-700 p-20 self-center flex flex-col items-center justify-center w-5/6">
          <h1 className="text-3xl pb-2 font-burtons w-full text-center">
            equipment item
          </h1>
          8
          {/* MODELS SECTION */}
          {/* models 'form' */}
          <div className="flex justify-around !bg-orange-200 !w-full !h-full !m-1 border !border-emerald-300">
            <button
              type="button"
              className="bg-teal-500 w-20 rounded-md mr-8 hover:bg-red-400 active:bg-green-300"
              onClick={() => {
                setShowModelSelect(!showModelSelect);
              }}>
              {showModelSelect ? 'close model select' : 'choose model'}
            </button>
            <div className="flex flex-col items-center w-full">
              <span className="model-span block w-4/5 text-left border-b-purple-400 border-b px-5 mb-2 border-slate-900 h-8">
                {formik.values.eq_type}
              </span>
              <span className="model-span block w-4/5 text-left border-b-purple-400 border-b px-5 mb-2 border-slate-900 h-8">
                {formik.values.make}
              </span>
              <span className="model-span block w-4/5 !h-fit text-left border-b-purple-400 border-b px-5 mb-2 border-slate-900">
                {formik.values.model_name}
              </span>
            </div>
          </div>

          {/* models accordion */}
          <div className={`model-select ${showModelSelect ? '' : 'hidden'}  border border-blue-700 w-full h-64 overflow-y-auto`}>
            <table>
              <thead>
                <tr>
                  <th className="border-b-2 text-left"></th>
                  <th className="border-b-2 text-left">type</th>
                  <th className="border-b-2 text-left">make</th>
                  <th className="border-b-2 text-left">model</th>
                </tr>
              </thead>
              <tbody>
                {models.length > 0 && models.map((m, i) => (
                  <tr className="border-b-2" key={i}>
                    <td className="!p-2" key={`td-btn-${i}`}>
                      <button
                        type="button"
                        className="rounded-md w-fit h-fit !px-2 bg-orange-400"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(`m = ${m.id}, ${m.model_name}`)
                          setSelectedModel(m)
                          formik.values.eq_type = m.eq_type && m.eq_type;
                          formik.values.model_id = m.id;
                          formik.values.make = m.make && m.make;
                          formik.values.model_name = m.model_name && m.model_name;
                          setShowModelSelect(false);
                        }}>
                        {' >> '}
                      </button>
                    </td>
                    <td key={`td-0-${i}`}>{m.eq_type}</td>
                    <td key={`td-1-${i}`}>{m.make}</td>
                    <td key={`td-2-${i}`}>{m.model_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LOCATIONS SECTION */}
          {/* locations 'form' */}
          <div className="flex justify-around !bg-orange-200 !w-full !h-full !m-1 border !border-emerald-300">
            <button
              type="button"
              className="bg-teal-500 w-20 rounded-md mr-8 hover:bg-red-400 active:bg-green-300"
              onClick={() => {
                setShowLocationSelect(!showLocationSelect);
              }}>
              {showLocationSelect ? 'close location select' : 'choose location'}
            </button>
            <div className="flex flex-col items-center w-full">
              <span className="model-span block w-4/5 text-left border-b-purple-400 border-b px-5 mb-2 border-slate-900 h-8">
                {formik.values.building}
              </span>
              <span className="model-span block w-4/5 text-left border-b-purple-400 border-b px-5 mb-2 border-slate-900 h-8">
                {formik.values.room}
              </span>
            </div>
          </div>
          {/* locations accordion */}
          <div className={`location-select ${showLocationSelect ? '' : 'hidden'}  border border-blue-700 w-full h-64 overflow-y-auto`}>
            <table>
              <thead>
                <tr>
                  <th className="border-b-2 text-left"></th>
                  <th className="border-b-2 text-left">building</th>
                  <th className="border-b-2 text-left">room</th>
                </tr>
              </thead>
              <tbody>
                {locations && locations.length > 0 && locations.map((loc, i) => (
                  <tr className="border-b-2" key={i}>
                    <td className="!p-2" key={`tdl-btn-${i}`}>
                      <button
                        type="button"
                        className="rounded-md w-fit h-fit !px-2 bg-orange-400"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(`m = ${loc.id}, ${loc.room}`)
                          setSelectedLocation(loc)
                          formik.values.building = loc.building && loc.building;
                          formik.values.room = loc.room && loc.room;
                          formik.values.location_id = loc.id && loc.id;
                          setShowLocationSelect(false);
                        }}>
                        {' >> '}
                      </button>
                    </td>
                    <td key={`tdl-0-${i}`}>{loc.building}</td>
                    <td key={`tdl-1-${i}`}>{loc.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* DISPLAY IDS SECTION */}
          <input
            disabled
            type="text"
            name="model_id"
            className="!w-full text-center"
            value={`model_id: ${formik.values.model_id}`} />
          <input
            disabled
            type="text"
            name="id"
            className="!w-full text-center"
            value={`eq_id: ${formik.values.id}`} />
          <input
            disabled
            type="text"
            name="location_id"
            className="!w-full text-center"
            value={`loc_id: ${formik.values.location_id}`} />
          <div className="mt-6 w-full">

            <div className="pb-4">
              <label
                htmlFor="serial_number"
                className={`block font-latoBold text-sm pb-1 ${formik.touched.serial_number && formik.errors.serial_number
                  ? 'text-red-500'
                  : ''}`}
              >
                {formik.touched.serial_number && formik.errors.serial_number ? formik.errors.serial_number : "serial_number"}
              </label>
              <input
                className="bg-stone-50 border-2 px-2 py-1 border-gray-500 rounded-md w-full !focus:border-teal-500 !focus:ring-teal-500"
                type="text"
                name="serial_number"
                placeholder="Serial number"
                value={formik.values.serial_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            <div className="pb-4">
              <label
                htmlFor="id_tag"
                className={`block font-latoBold text-sm pb-1 ${formik.touched.id_tag && formik.errors.id_tag
                  ? 'text-red-500'
                  : ''}`}>
                {formik.touched.id_tag && formik.errors.id_tag
                  ? formik.errors.id_tag
                  : "id_tag"}
              </label>
              <input
                className="bg-stone-50 border-2 border-gray-500 px-2 py-1 rounded-md w-full focus:border-orange-500 focus:ring-orange-500"
                type="text"
                name="id_tag"
                placeholder="ID tag"
                value={formik.values.id_tag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            <div className="pb-4">
              <label className="block font-latoBold text-sm pb-1" htmlFor="status">status</label>
              {/* "Active","Inactive","Out of service", "Lost", "In use", "Dan took it" */}
              <select
                className="bg-stone-50 border-2 red border-gray-500 p-1.5 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Out of service</option>
                <option>Lost</option>
                <option>Dan took it</option>
              </select>
            </div>
            <div className="pb-4">
              <label
                htmlFor="notes"
                className={`block font-latoBold text-sm pb-1 ${formik.touched.notes && formik.errors.notes
                  ? 'text-red-500'
                  : ''}`}>
                {formik.touched.notes && formik.errors.notes
                  ? formik.errors.notes
                  : "notes"}
              </label>
              <textarea
                className="bg-stone-50 border-2 border-gray-500 px-2 py-1 rounded-md w-full focus:border-orange-500 focus:ring-orange-500"
                name="notes"
                placeholder="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>


            <label htmlFor="insert-btn" className="block font-latoBold text-sm pb-1 text-blue-500 w-full text-center">
              {formik.errors.model_id ? formik.errors.model_id : ""}
            </label>
            <button
              disabled={Object.keys(formik.errors).length > 0}
              id="insert-btn"
              type="submit"
              className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-md w-full"
              onClick={() => setIsUpdate(false)}>
              Insert
            </button>
            <button
              disabled={Object.keys(formik.errors).length > 0}
              id="update-btn"
              type="submit"
              className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-md w-full"
              onClick={() => {
                setIsUpdate(true);
              }}
            >
              Update
            </button>
            <button
              id="clear-btn"
              type="button"
              className="bg-orange-500 font-latoBold text-sm text-white py-3 mt-6 rounded-md w-full"
              onClick={() => clearData()}>
              Clear data
            </button>
          </div>
        </div>

      </form>
    </main>
  );
}

export default EquipmentForm