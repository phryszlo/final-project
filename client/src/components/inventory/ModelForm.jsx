import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getModel, insertModel, updateModel } from "../../utilities/inventory-service";
import { ModelsContext } from "../../state/ModelsContext";

const ModelForm = () => {

  const { model } = useContext(ModelsContext);
  const [currMod, setCurrMod] = model;

  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const paramsId = useParams();


  useEffect(() => {
    const callGetModel = async () => {
      try {
        const eq = await getModel(paramsId.id);
        setCurrMod(eq);
      } catch (error) {
        console.log(`callGetLoc err: ${error}`)
      }
    }

    // get a model for the form only if there is an id param.
    if (Object.keys(paramsId).length > 0) {
      console.log(`paramsId: ${JSON.stringify(paramsId)}`);
      callGetModel();
    }
  }, []);

  // useEffect(() => {
  //   console.log(`locform euf: ${JSON.stringify(currLoc)}`)
  // }, [currLoc]);

  // this is a hack. the data was not displaying on first load, though it was there.
  // i don't know why this even works. without the call to setFormikVals in the useEffect[],
  // this currEq effect alone doesn't work. and vice/versa.
  useEffect(() => {
    setFormikVals(currMod);
  }, [currMod])

  const setFormikVals = (loc) => {
    console.log(`setFormikVals: ${JSON.stringify(loc)}`)
    if (Object.keys(loc).length > 0) {
      console.log(`eq len=${Object.keys(loc).length}`)
      formik.values.id = loc.id ? loc.id : "";
      formik.values.make = loc.make ? loc.make : "";
      formik.values.model_name = loc.model_name ? loc.model_name : "";
      formik.values.model_number = loc.model_number ? loc.model_number : "";
      formik.values.notes = loc.notes ? loc.notes : "";
    }
    console.log(`setFormikVals after set: ${JSON.stringify(formik.values)}`)

  }

  const formik = useFormik({
    initialValues: {
      id: null,
      make: "",
      model_name: "",
      model_number: "",
      notes: "",
    },

    validationSchema: Yup.object({
      make: Yup.string()
        .required("make is required"),
      model_name: Yup.string()
        .required("model_name is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      // 
      const loc = {
        make: formik.values.make,
        model_name: formik.values.model_name,
        model_number: formik.values.model_number,
        notes: formik.values.notes,
      }
      isUpdate ? updateModel(formik.values.id, loc) : insertModel(loc);
      // router.push({ pathname: '/success', query: values })
    },

    onReset: () => {
      // unsolved
      formik.values = ({ ...formik.initialValues });
      console.log(`reset was called`);
    }
  })

  return (
    <main className="currLoc-form-shell flex !sticky !top-20">
      <form className="flex flex-col items-center">
        <div className="currLoc-form-inner items-center !p-3 rounded-lg h-fit h-min-1/2 text-stone-200 bg-stone-700">
          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="make"
            >
              Make
            </label>
            <input
              type="text"
              name="make"
              placeholder="make"
              className="txt-make !p-1 !ml-2 rounded-md text-stone-900"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.make} />
          </div>

          <div className="error-field grid  !m-0">
            <span className="spacer inline-block"></span>
            <div
              className={`error-msg !p-0 !h-fit inline-block text-sm ${formik.touched.make && formik.errors.make
                ? 'text-orange-400'
                : 'hidden'}`}>
              {formik.touched.make && formik.errors.make ? formik.errors.make : ""}
            </div>
          </div>

          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="model_name"
            >
              Model name
            </label>
            <input
              type="text"
              name="model_name"
              placeholder="model_name"
              className="txt-model_name !p-1 !ml-2 rounded-md text-stone-900"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model_name} />
          </div>

          <div className="form-field grid grid-cols-2 !mt-3">
            <label
              htmlFor="model_number"
            >
              Model number
            </label>
            <input
              type="text"
              name="model_number"
              placeholder="model_number"
              className="txt-model_number !p-1 !ml-2 rounded-md text-stone-900"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model_name} />
          </div>

          <div className="error-field grid  !m-0">
            <span className="spacer inline-block"></span>
            <div
              className={`error-field !p-0 !h-fit inline-block text-sm ${formik.touched.model_name && formik.errors.model_name
                ? 'text-orange-400'
                : 'hidden'}`}>
              {formik.touched.model_name && formik.errors.model_name ? formik.errors.model_name : ""}
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
              className="txt-notes !p-1 !ml-2 rounded-md text-stone-900"
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
        <div className="currLoc-form-lower">
          <button
            className="currLoc-add-btn !py-1 !px-3 bg-orange-600 rounded-lg !mt-2"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {isUpdate ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </main>
  )
};

export default ModelForm;
