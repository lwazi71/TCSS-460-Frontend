'use client';

import { useEffect, useState } from 'react';
import axios from 'utils/axios';

import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Rating,
    CssBaseline,
    Alert,
    createTheme,
    ThemeProvider
} from '@mui/material';

import { useParams } from 'next/navigation';
import { IBook } from 'types/book';

import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const theme = createTheme();

type IBookWithId = IBook & { book_id: string };

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
    const router = useRouter();
    const params = useParams();
    const book_id = params.book_id as string;

    const [book, setBook] = useState<IBookWithId | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [alert, setAlert] = useState<IAlert>(EMPTY_ALERT);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${process.env.WEB_API_URL}c/book/${book_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const books = response.data.data;
                if (Array.isArray(books) && books.length > 0) {
                    setBook({ ...books[0], book_id: books[0].id });
                } else {
                    throw new Error('Book not found');
                }
                console.log("BOOK - ", response.data.data)
            } catch (error: any) {
                const message = error?.response?.data?.message || 'Failed to fetch book';
                setAlert({
                    showAlert: true,
                    alertMessage: message,
                    alertSeverity: 'error'
                });
            }
        };

        if (book_id) {
            fetchBook();
        }
    }, [book_id]);

    const handleRatingChange = async (_: any, newValue: number | null) => {
        if (newValue === null) return;
        setUserRating(newValue);
        try {
            const token = localStorage.getItem('token');
            const method = userRating === null ? 'post' : 'patch';
            const response = await axios({
                method,
                url: `${process.env.WEB_API_URL}c/book/${book_id}/rating`,
                data: { rating: newValue },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBook(response.data.data);
            setAlert({
                showAlert: true,
                alertMessage: response.data.message || 'Rating updated.',
                alertSeverity: 'success'
            });
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Failed to submit rating';
            setAlert({
                showAlert: true,
                alertMessage: message,
                alertSeverity: 'error'
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ alignSelf: 'flex-start', mb: 2 }}>
                        <IconButton onClick={() => router.back()} aria-label="go back">
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                    {alert.showAlert && (
                        <Alert
                            severity={alert.alertSeverity}
                            onClose={() => setAlert(EMPTY_ALERT)}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            {alert.alertMessage}
                        </Alert>
                    )}

                    {!book ? (
                        <Typography variant="h6">Loading book data...</Typography>
                    ) : (
                        <Card sx={{ display: 'flex', width: '100%' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 240 }}
                                image={book.icons?.large || '/placeholder.png'}
                                alt={book.title || 'Book Cover'}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <CardContent>
                                    <Typography component="h1" variant="h5" gutterBottom>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {book.original_title} ({book.publication})
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Authors: {book.authors}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ISBN-13: {book.isbn13}
                                    </Typography>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2">Your Rating</Typography>
                                        <Rating
                                            name="user-book-rating"
                                            value={userRating}
                                            onChange={handleRatingChange}
                                        />
                                    </Box>

                                    {book.ratings && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Overall Ratings:
                                            </Typography>
                                            <Typography variant="body2">Average: {book.ratings.average.toFixed(2)}</Typography>
                                            <Typography variant="body2">Total: {book.ratings.count}</Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Box>
                        </Card>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
