// EmployeeForm.js
"use client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";

const EmployeeForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  const validationSchema = yup.object({
    employeeName: yup.string().required("Please enter the employee's name"),
    designation: yup
      .string()
      .required("Please enter the employee's designation"),
    employeeEmail: yup.string().email().required("Please enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      designation: "",
      employeeEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Dispatch action to add employee
      dispatch(addEmployee(values));
      // Reset the form or perform any necessary actions
      formik.resetForm();
    },
  });

  const handleCompanyClick = (companyId) => {
    // Navigate to the dynamic page with company details
    router.push(`/company/${companyId}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Employee Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* employee name */}
        <Input
          type="text"
          placeholder="Employee Name"
          id="employeeName"
          {...formik.getFieldProps("employeeName")}
          className="mb-4"
        />
        {formik.touched.employeeName && formik.errors.employeeName && (
          <div className="text-red-500">{formik.errors.employeeName}</div>
        )}
        {/* designation */}
        <Input
          type="text"
          placeholder="Designation"
          id="designation"
          {...formik.getFieldProps("designation")}
          className="mb-4"
        />
        {formik.touched.designation && formik.errors.designation && (
          <div className="text-red-500">{formik.errors.designation}</div>
        )}
        {/* email */}
        <Input
          type="email"
          placeholder="Email"
          id="employeeEmail"
          {...formik.getFieldProps("employeeEmail")}
          className="mb-4"
        />
        {formik.touched.employeeEmail && formik.errors.employeeEmail && (
          <div className="text-red-500">{formik.errors.employeeEmail}</div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <h2>Company Data:</h2>
        <table className="border-collapse w-full mt-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Company ID</th>
              <th className="border border-gray-400 px-4 py-2">Company Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">
                Num Employees
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={index}
                onClick={() => handleCompanyClick(company.companyId)}
              >
                <td className="border border-gray-400 px-4 py-2">
                  {company.companyId}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {company.companyName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {company.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {company.numEmployees}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeForm;
