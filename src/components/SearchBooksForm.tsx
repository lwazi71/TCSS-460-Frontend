import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookSearchForm = ({ onSearch }) => {
  // Optional validation schema
  const validationSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
    year: Yup.number()
      .integer('Year must be an integer')
      .min(0, 'Invalid year')
      .nullable()
      .transform((value, originalValue) => originalValue === '' ? null : value),
  });

  return (
    <Formik
      initialValues={{ title: '', author: '', year: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSearch(values);
      }}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" placeholder="e.g. Harry Potter" />
            <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <Field name="author" placeholder="e.g. J.K. Rowling" />
            <ErrorMessage name="author" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="year">Publishing Year</label>
            <Field name="year" type="number" placeholder="e.g. 2007" />
            <ErrorMessage name="year" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit">Search</button>
        </Form>
      )}
    </Formik>
  );
};

export default BookSearchForm;
