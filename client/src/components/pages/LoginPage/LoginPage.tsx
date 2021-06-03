import React, { useState } from "react";
import { auth, loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const { Title } = Typography;

type LoginFormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleSubmitLoginForm = async (dataToSubmit: LoginFormData) => {
    try {
      const result = await loginUser(dataToSubmit);
      dispatch(result);
      if (result.payload.loginSuccess) {
        auth().then((result) => {
          dispatch(result);
        });
        history.push("/");
      } else {
        setFormErrorMessage("Check out your Account or Password again");
      }
    } catch (e) {
      setFormErrorMessage("Check out your Account or Password again");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values) => {
        const dataToSubmit = {
          email: values.email,
          password: values.password,
        };

        handleSubmitLoginForm(dataToSubmit);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: "#ff0000bf",
                      fontSize: "0.7rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    Log in
                  </Button>
                </div>
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
