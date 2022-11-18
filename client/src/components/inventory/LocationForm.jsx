import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLocation, insertLocation, updateLocation } from "../../utilities/inventory-service";

const LocationForm = ({ location }) => {

  const [currLoc, setCurrLoc] = useState(location ? location : {boo: "yah"});
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`locform euf: ${JSON.stringify(location)}`)
  }, [location]);

  // this is a hack. the data was not displaying on first load, though it was there.
  // i don't know why this even works. without the call to setFormikVals in the useEffect[],
  // this currEq effect alone doesn't work. and vice/versa.
  useEffect(() => {
    setFormikVals(currLoc);
  }, [currLoc])

  const setFormikVals = (loc) => {
    console.log(`setFormikVals: ${JSON.stringify(loc)}`)
    if (Object.keys(loc).length > 0) {
      console.log(`eq len=${Object.keys(loc).length}`)
      formik.values.id = loc.id ? loc.id : "";
      formik.values.building = loc.building ? loc.building : "";
      formik.values.room = loc.room ? loc.room : "";
      formik.values.location_type = loc.location_type ? loc.location_type : "";
      formik.values.notes = loc.notes ? loc.notes : "";
    }
    console.log(`setFormikVals after set: ${JSON.stringify(formik.values)}`)

  }

  const formik = useFormik({
    initialValues: {
      id: null,
      building: "",
      room: "",
      location_type: "",
      notes: "",
    },

    validationSchema: Yup.object({
      building: Yup.string()
        .required("building is required"),
      room: Yup.string()
        .required("room is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      // 
      const loc = {
        building: formik.values.building,
        room: formik.values.room,
        location_type: formik.values.location_type,
        notes: formik.values.notes,
      }
      isUpdate ? updateLocation(formik.values.id, loc) : insertLocation(loc);
      // router.push({ pathname: '/success', query: values })
    },

    onReset: () => {
      // unsolved
      formik.values = ({ ...formik.initialValues });
      console.log(`reset was called`);
    }
  })

  return (
    <main className="location-form-shell flex border-x-orange-300">
      <form className="flex flex-col items-center">
        <div className="location-form-inner items-center !p-3 rounded-lg h-fit h-min-1/2 text-stone-200 bg-stone-700">
          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="building"
            >
              Building
            </label>
            <input
              type="text"
              name="building"
              placeholder="building"
              className="txt-building !p-1 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.building} />
          </div>

          <div className="error-field grid  !m-0">
            <span className="spacer inline-block"></span>
            <div
              className={`error-msg !p-0 !h-fit inline-block text-sm ${formik.touched.building && formik.errors.building
                ? 'text-orange-400'
                : 'hidden'}`}>
              {formik.touched.building && formik.errors.building ? formik.errors.building : ""}
            </div>
          </div>

          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="room"
            >
              Room
            </label>
            <input
              type="text"
              name="room"
              placeholder="room"
              className="txt-room !p-1 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.room} />
          </div>

          <div className="error-field grid  !m-0">
            <span className="spacer inline-block"></span>
            <div
              className={`error-field !p-0 !h-fit inline-block text-sm ${formik.touched.room && formik.errors.room
                ? 'text-orange-400'
                : 'hidden'}`}>
              {formik.touched.room && formik.errors.room ? formik.errors.room : ""}
            </div>
          </div>
          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="notes"
            >
              Notes
            </label>
            <textarea
              name="notes"
              className="txt-notes !p-1 rounded-md"
              placeholder="notes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes} />
          </div>

          <div
            className={`error-field !p-0 !h-fit inline-block text-sm ${formik.touched.notes && formik.errors.notes
              ? 'text-orange-400'
              : 'hidden'}`}>
            {formik.touched.notes && formik.errors.notes ? formik.errors.notes : ""}
          </div>

        </div> {/* end of form-inner */}
        <div className="location-form-lower">
          <button className="location-add-btn !py-1 !px-3 bg-orange-600 rounded-lg !mt-2">{isUpdate ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </main>
  )
};

export default LocationForm;
