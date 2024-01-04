// EmployeeForm.js
"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { addEmployee } from "@/redux/employeeSlice";

const EmployeeForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);

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
              <th className="border border-gray-400 px-4 py-2">Company Id </th>
              <th className="border border-gray-400 px-4 py-2">
                Employee Name
              </th>
              <th className="border border-gray-400 px-4 py-2">DEsignation</th>
              <th className="border border-gray-400 px-4 py-2">email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {employee.companyId}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {employee.employeeName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {employee.designation}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {employee.employeeEmail}
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
