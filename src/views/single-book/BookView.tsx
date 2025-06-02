'use client';

import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

// MUI components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

type Book = {
  book_id: number;
  isbn13: string;
  original_publication_year: number;
  original_title: string;
  title: string;
  image_url: string;
  small_image_url: string;
};

type IAlert = {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: 'success' | 'error';
};

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: 'success'
};

export default function BookView() {
  const [book, setBook] = useState<Book | null>(null);
  const [userRating, setUserRating] = useState<number | null>(4);
  const [alert, setAlert] = useState<IAlert>(EMPTY_ALERT);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Book>(
          `${process.env.WEB_API_URL}c/book/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBook(response.data);
      } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to fetch book';
        setAlert({
          showAlert: true,
          alertMessage: message,
          alertSeverity: 'error'
        });
      }
    };

    fetchBook();
  }, []);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      {alert.showAlert && (
        <Alert
          severity={alert.alertSeverity}
          onClose={() => setAlert(EMPTY_ALERT)}
          sx={{ mb: 2 }}
        >
          {alert.alertMessage}
        </Alert>
      )}

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={book.image_url}
              alt={book.title}
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h4" component="h1">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.original_title} ({book.original_publication_year})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ISBN-13: {book.isbn13}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Your Rating:
                  </Typography>
                  <Rating
                    name="book-rating"
                    value={userRating}
                    onChange={(event, newValue) => {
                      setUserRating(newValue);
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
