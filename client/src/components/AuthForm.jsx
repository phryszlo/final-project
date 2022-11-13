import formImage from "../images/hester.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from '../utilities/users-service'

export default function AuthForm({ setUser }) {

  const [error, setError] = useState('');

  // const router = useRouter();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "daren ",
      email: "daren@gmail.com",
      country: "Germany",
      password: "123",
      terms: ["checked"]
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 chars or less")
        .required("Name is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      terms: Yup.array()
        .min(1, "If we can't sell your data, you are not welcome here.")
        .required("If we can't sell your data, you are not welcome here."),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        const formData = { name:values.name, email: values.email, password: values.password }
        console.log(`formData: ${JSON.stringify(formData)}`);
        const user = await signUp(formData);
        if (user === 401) return setError('Unauthorized')
        setUser(user.data)
        navigate('success', { state: values });
      } catch (error) {
        console.log(`error: ${error}`);
        setError('Sign-up Failed - Try Again');
      }
      // router.push({ pathname: '/success', query: values })
    },
  })


  console.log(formik.values.terms);

  return (
    // <AnimatePresence>

    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute h-full bg-slate-500">
      <main className="h-screen flex flex-col items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="bg-stone-100 flex flex-row rounded-lg w-4/5 font-latoRegular">
          <div className="flex-1 text-gray-700 px-20 pt-7">
            <h1 className="text-3xl pb-2 font-burtons">
              Sign up for my thing 🎣
            </h1>
            <div className="mt-6">
              <div className="pb-2">
                <label
                  htmlFor="name"
                  className={` font-latoBold text-sm pb-1 ${formik.touched.name && formik.errors.name
                    ? 'text-red-500'
                    : ''}`}
                >
                  {formik.touched.name && formik.errors.name ? formik.errors.name : "name"}
                </label>
                <input
                  className="bg-stone-50 border-2 px-2 py-1 border-gray-500 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
              </div>
              <div className="pb-2">
                <label
                  htmlFor="email"
                  className={` font-latoBold text-sm pb-1 ${formik.touched.email && formik.errors.email
                    ? 'text-red-500'
                    : ''}`}>
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "email"}
                </label>
                <input
                  className="bg-stone-50 border-2 border-gray-500 px-2 py-1 rounded-md w-full focus:border-orange-500 focus:ring-orange-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
              </div>
              <div className="pb-2">
                <label
                  htmlFor="password"
                  className={` font-latoBold text-sm pb-1 ${formik.touched.password && formik.errors.password
                    ? 'text-red-500'
                    : ''}`}>
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "password"}
                </label>
                <input
                  className="bg-stone-50 border-2 border-gray-500 px-2 py-1 rounded-md w-full focus:border-orange-500 focus:ring-orange-500"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
              </div>
              <div className="pb-2">
                <label className=" font-latoBold text-sm pb-1" htmlFor="country">country</label>
                <select
                  className="bg-stone-50 border-2 red border-gray-500 p-1.5 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                  name="country"
                  defaultValue=""
                  value={formik.values.country}
                  onChange={formik.handleChange}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option selected="selected">Germany</option>
                </select>
              </div>

              <div className="pb-4">
                <label
                  htmlFor="terms"
                  className={` font-latoBold text-sm pb-2 ${formik.touched.terms && formik.errors.terms
                    ? 'text-red-500'
                    : ''}`}
                >
                  {formik.touched.terms && formik.errors.terms ? formik.errors.terms : ''}
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    onChange={formik.handleChange}
                    className="h-5 w-5 text-teal-500 focus:border-teal-500"
                  />
                  <p className=" text-sm font-latoBold text-gray-500">
                    I agree to the Terms and Service that my data will be taken
                    and sold.
                  </p>
                </div>
              </div>
              <p className="error-message  text-sm font-latoBold text-red-600" onChange={() => this.logMsg(error)} >{error}</p>
              <button type="submit" className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full">Do this thing</button>
            </div>
          </div>
          <div className="relative flex-1 h-full">
            <img src={formImage} fill className="object-cover h-full object-left-top rounded-lg" alt="form-dog" />
          </div>
        </form>

      </main>

      <footer>

      </footer>
    </m.div>
    // </AnimatePresence>
  )
}
