'use client';

import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const mockBook = {
  id: 1,
  title: 'A book about something',
  author: 'John Doe',
  description:
    'An epic tale',
  image: '', //No image yet
  rating: 4,
};

export default function BookView() {
  const [userRating, setUserRating] = useState<number | null>(mockBook.rating);

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={mockBook.image}
              alt={mockBook.title}
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h4" component="h1">
                  {mockBook.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  by {mockBook.author}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {mockBook.description}
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
