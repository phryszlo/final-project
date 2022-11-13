import formImage from "../images/hester.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'

import { signUp } from '../utilities/users-service'

export default function SignupForm({ setUser }) {

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
      password: Yup.string()
        .min(3, 'Password must be min. 3 characters long')
        // .matches(/[0-9]/, 'Password requires a number')
        // .matches(/[a-z]/, 'Password requires a lowercase letter')
        // .matches(/[A-Z]/, 'Password requires an uppercase letter')
        // .matches(/[^\w]/, 'Password requires a symbol'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        const formData = { name: values.name, email: values.email, password: values.password }
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
      className="signup-form-outer">
      <main className="main signup-main">
        <Form onSubmit={formik.handleSubmit} className="form signup-form">
          <div className="form-body">
            <h1 className="text-3xl pb-2 font-burtons">
              Sign up for my thing 🎣
            </h1>
            <div className="mt-6">
              <Form.Field className="pb-2">
                <label
                  htmlFor="name"
                  className={`${formik.touched.name && formik.errors.name
                    ? 'text-red-500'
                    : ''}`}
                >
                  {formik.touched.name && formik.errors.name ? formik.errors.name : "name"}
                </label>
                <input
                  className=""
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
              </Form.Field>
              <Form.Field className="pb-2">
                <label
                  htmlFor="email"
                  className={`${formik.touched.email && formik.errors.email
                    ? 'text-red-500'
                    : ''}`}>
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "email"}
                </label>
                <input
                  className=""
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
              </Form.Field>
              <Form.Field className="pb-2">
                <label
                  htmlFor="password"
                  className={`${formik.touched.password && formik.errors.password
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
              </Form.Field>
              <Form.Field className="pb-2">
                <label className="text-sm pb-1" htmlFor="country">country</label>
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
              </Form.Field>

              <Form.Field className="pb-4">
                <label
                  htmlFor="terms"
                  className={`text-sm pb-2 ${formik.touched.terms && formik.errors.terms
                    ? 'text-red-500'
                    : ''}`}
                >
                  {formik.touched.terms && formik.errors.terms ? formik.errors.terms : ''}
                </label>

                <div className="check-flex">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    onChange={formik.handleChange}
                    className="chk"
                  />
                  <p className="terms-text">
                    I agree to the Terms and Service that my data will be taken
                    and sold.
                  </p>
                </div>
              </Form.Field>
              <p className="error-message  text-sm text-red-600" onChange={() => this.logMsg(error)} >{error}</p>
              <Form.Field className="button-field">
                <Button type="submit" className="submit-btn">Sign me up</Button>
              </Form.Field>
            </div>
          </div>
          <div className="form-img-wrap relative flex-1 h-full">
            <img src={formImage} fill className="form-img" alt="hester the dog" />
          </div>
        </Form>

      </main>

      <footer>

      </footer>
    </m.div>
    // </AnimatePresence>
  )
}
