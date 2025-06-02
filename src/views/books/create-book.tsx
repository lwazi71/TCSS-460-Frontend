'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import BookIcon from '@mui/icons-material/Book';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: 'success' | 'error';
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: 'success'
};

export default function CreateBook() {
  const [form, setForm] = React.useState({
    isbn13: '',
    title: '',
    authors: '',
    publication_year: '',
    original_title: '',
    image_url: '',
    image_small_url: ''
  });
  const [alert, setAlert] = React.useState<IAlert>(EMPTY_ALERT);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(EMPTY_ALERT);

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${process.env.WEB_API_URL}c/book`,
        {
          isbn13: form.isbn13,
          title: form.title,
          authors: form.authors,
          publication_year: form.publication_year ? Number(form.publication_year) : undefined,
          original_title: form.original_title || undefined,
          image_url: form.image_url || undefined,
          image_small_url: form.image_small_url || undefined
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAlert({
        showAlert: true,
        alertMessage: 'Book created successfully!',
        alertSeverity: 'success'
      });

      // const isbn = response.data.data.isbn13;
      // router.push(`/books/${isbn}`); // change redirection to the single book page

      router.push('/books/list');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Unexpected error';
      setAlert({
        showAlert: true,
        alertMessage: 'Failed to create book: ' + message,
        alertSeverity: 'error'
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity} onClose={() => setAlert(EMPTY_ALERT)} sx={{ m: 2 }}>
          {alert.alertMessage}
        </Alert>
      )}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Book
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {[
              { label: 'ISBN-13', name: 'isbn13', required: true },
              { label: 'Title', name: 'title', required: true },
              { label: 'Authors (comma-separated)', name: 'authors', required: true },
              { label: 'Publication Year', name: 'publication_year', required: false },
              { label: 'Original Title', name: 'original_title', required: false },
              { label: 'Image URL', name: 'image_url', required: false },
              { label: 'Small Image URL', name: 'image_small_url', required: false }
            ].map((field) => (
              <TextField
                key={field.name}
                margin="normal"
                required={field.required}
                fullWidth
                label={field.label}
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
              />
            ))}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Create Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
