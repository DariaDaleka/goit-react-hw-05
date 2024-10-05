import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./SearchForm.module.css";
import * as Yup from "yup";

const SearchForm = ({ handleQuery }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    handleQuery(values.query);
    resetForm();
  };

  const validationSchema = Yup.object({
    query: Yup.string()
      .required("Form is required ")
      .min(3, "Enter please min 3 chars."),
  });

  return (
    <div className={s.wrapp}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <Field name="query" className={s.input} placeholder="Enter..." />
          <button type="submit" className={s.btn}>
            Search
          </button>
          <ErrorMessage name="query" component="span" />
        </Form>
      </Formik>
    </div>
  );
};
export default SearchForm;