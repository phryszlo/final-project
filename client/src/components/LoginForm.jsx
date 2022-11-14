import formImage from "../images/hester.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react';

import { logIn } from '../utilities/users-service'

const { REACT_APP_API_URL } = process.env;

export default function LoginForm({ setUser }) {

  const [error, setError] = useState('');

  // const router = useRouter();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "daren@gmail.com",
      password: "123",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(3, 'Password must be min. 3 characters long')
    }),

    onSubmit: async (values) => {
      console.log(`values=${values}`);
      const formData = { name: values.name, email: values.email, password: values.password }
      try {
        const user = await logIn(formData);
        if (user === 401) return setError('Unauthorized')
        setUser(user.data)
      } catch {
        console.log(`error: ${error}`);
        setError('Login Failed - Try Again');
      }
    },
  })


  // console.log(formik.values);

  return (
    // <AnimatePresence>

    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="login-form-outer">
      <main className="main login-main">
        <Form onSubmit={formik.handleSubmit} className="form login-form">
          <div className="form-body">
            <h1 className="text-3xl pb-2 font-burtons">
              🪵 Log in to my thing
            </h1>
            <div className="mt-6">

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

              <p className="error-message text-red-600" onChange={() => this.logMsg(error)} >{error}</p>
              <Form.Field className="button-field">
                <Button type="submit" className="submit-btn">Log on</Button>
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
