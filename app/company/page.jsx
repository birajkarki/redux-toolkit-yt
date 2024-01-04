"use client";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "@/redux/companySlice";
import { Input } from "@/components/ui/input";

const CompanyForm = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const validationSchema = yup.object({
    companyId: yup.string().required(" Please enter a valid ID"),
    companyName: yup.string().required("Please enter a valid name"),
    email: yup.string().email().required("Please enter a valid email"),
    numEmployees: yup
      .number()
      .min(1, "Number of employees must be greate than 0")
      .required("Please enter a valid numbeer of employees"),
  });
  const formik = useFormik({
    initialValues: {
      companyId: "",
      companyName: "",
      email: "",
      numEmployees: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addCompany(values));
      alert("Company added successfully!");
      resetForm();
    },
  });
  const handleCompanyDetails = (companyId) => {
    // Redirect to the dynamic page with company details
    // You can use Next.js router for navigation
    // Replace '/company-details' with the actual dynamic route
    router.push(`/company-details/${companyId}`);
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* company id  */}
        <Input
          type="text"
          placeholder="Company ID"
          id="companyId"
          {...formik.getFieldProps("companyId")}
          className="mb-4"
        />
        {formik.touched.companyId && formik.errors.companyId && (
          <div className="text-red-500">{formik.errors.companyId}</div>
        )}
        {/* company full name */}
        <Input
          type="text"
          placeholder="Company Name"
          id="companyName"
          {...formik.getFieldProps("companyName")}
          className="mb-4"
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <div className="text-red-500">{formik.errors.companyName}</div>
        )}
        {/* email  */}
        <Input
          type="email"
          placeholder="Email"
          id="email"
          {...formik.getFieldProps("email")}
          className="mb-4"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        {/* number of employees */}
        <Input
          type="number"
          placeholder="Number of Employees"
          id="numEmployees"
          {...formik.getFieldProps("numEmployees")}
          className="mb-4"
        />
        {formik.touched.numEmployees && formik.errors.numEmployees && (
          <div className="text-red-500">{formik.errors.numEmployees}</div>
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
              <tr key={index}>
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
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => handleCompanyDetails(company.companyId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyForm;
