'use client';

import React from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { IBook } from 'types/book';
import axios from 'utils/axios';

export default function SearchBook({
  onSuccess,
  onError
}: {
  onSuccess: (books: IBook[], msg: string) => void;
  onError: (msg: string) => void;
}) {
  return (
    <>
      <Formik
        initialValues={{
          title: '',
          authors: '',
          year: 0,
          isbn13: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string(),
          authors: Yup.string(),
          year: Yup.number()
            .integer('Year must be an integer')
            .min(0, 'Invalid year')
            .nullable()
            .transform((value, originalValue) => (originalValue === '' ? null : value)),
          isbn13: Yup.string()
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          const urlExt = getURLExt(values);
          axios
            .get('c/book' + urlExt)
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                  title: '',
                  authors: '',
                  year: 0,
                  isbn13: '',
                  submit: null
                }
              });
              console.log(response.data.message);
              onSuccess(response.data.data || [], response.data.message); //send the books
            })
            .catch((error) => {
              console.log(error.response?.message);
              console.error(error);
              setErrors({ submit: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Book Title</InputLabel>
                  <OutlinedInput
                    id="book-title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's title"
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="authors">Author(s)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.authors && errors.authors)}
                    id="book-authors"
                    type="text"
                    value={values.authors}
                    name="authors"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's author(s)"
                  />
                </Stack>
                {touched.authors && errors.authors && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.authors}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="year">Publication Year</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.year && errors.year)}
                    id="book-year"
                    type="number"
                    value={values.year}
                    name="year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's publication year"
                  />
                </Stack>
                {touched.year && errors.year && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.year}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">ISBN-13</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                    id="book-isbn13"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's ISBN-13"
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Search
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

function getURLExt(values: { title: string; authors: string; year: number; isbn13: string; submit?: null }) {
  const params = new URLSearchParams();

  if (values.title) params.append('title', values.title);
  if (values.authors) params.append('authors', values.authors);
  if (values.year) params.append('publication_year', values.year.toString());
  if (values.isbn13) params.append('isbn13', values.isbn13);

  return params.toString() ? `?${params.toString()}` : '';
}
