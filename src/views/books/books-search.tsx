'use client';

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Divider, List, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchBook from 'sections/books/bookSearch';
import { IBook } from 'types/book';
import { BookListItem, NoBook } from 'components/BookListItem';
import axios from 'utils/axios';

const defaultTheme = createTheme();
const EMPTY_ALERT = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: 'info'
};

type IBookWithId = IBook & { book_id: string };

export default function BookSearch() {
  const [alert, setAlert] = useState(EMPTY_ALERT);
  const [results, setResults] = useState<IBookWithId[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastSearchValues, setLastSearchValues] = useState({
    title: '',
    authors: '',
    year: 0,
    isbn13: ''
  });

  const onSuccess = (books: IBookWithId[], message: string, total: number) => {
    setResults(books);
    setTotalPages(total);
    setPage(1);
    setAlert({ showAlert: true, alertMessage: message, alertSeverity: 'success' });
    setSearchPerformed(true);
  };

  const onError = (message: string) => {
    setAlert({ showAlert: true, alertMessage: 'Search failed: ' + message, alertSeverity: 'error' });
  };

  const fetchBooks = (pageNumber: number) => {
    const limit = 25;
    const params = new URLSearchParams();
    if (lastSearchValues.title) params.append('title', lastSearchValues.title);
    if (lastSearchValues.authors) params.append('authors', lastSearchValues.authors);
    if (lastSearchValues.year) params.append('publication_year', lastSearchValues.year.toString());
    if (lastSearchValues.isbn13) params.append('isbn13', lastSearchValues.isbn13);
    params.append('page', pageNumber.toString());
    params.append('limit', limit.toString());
    console.log('outside of axios');

    axios
      .get('c/book?' + params.toString())
      .then((res) => {
        const books = res.data.data.map((book: any) => ({ ...book, book_id: book.id }));

        setResults(books);
        setPage(pageNumber);

        const totalCount = res.data.pagination.total_count ?? 0;
        const computedTotalPages = Math.ceil(totalCount / limit);
        setTotalPages(computedTotalPages || 1);
      })
      .catch((err) => {
        setAlert({ showAlert: true, alertMessage: 'Failed to load page: ' + err.message, alertSeverity: 'error' });
      });
  };

  const handleDelete = (isbn13: number) => {
    setResults((prev) => prev.filter((b) => b.isbn13 !== isbn13));
  };

  const booksAsComponents = results.map((book, index) => (
    <React.Fragment key={book.isbn13}>
      <BookListItem book={book} onDelete={handleDelete} />
      {index < results.length - 1 && <Divider variant="middle" component="li" />}
    </React.Fragment>
  ));

  const handleNext = () => {
    console.log('Going to next page', page + 1);
    console.log('page=', page, ' totalPages=', totalPages);
    if (page < totalPages) fetchBooks(page + 1);
  };

  const handlePrev = () => {
    console.log('Going to prev page', page - 1);
    if (page > 1) fetchBooks(page - 1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Search Books
          </Typography>

          <Box sx={{ mt: 3, width: '100%' }}>
            <SearchBook onSuccess={onSuccess} onError={onError} onSearchValuesSet={(values) => setLastSearchValues(values)} />
          </Box>

          <Box sx={{ mt: 4, width: '100%' }}>
            <List>{booksAsComponents.length > 0 ? booksAsComponents : <NoBook />}</List>

            {searchPerformed && (
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Button variant="contained" onClick={handlePrev} disabled={page <= 1}>
                    Previous
                  </Button>
                  <Typography variant="body1">Page {page}</Typography>
                  <Button variant="contained" onClick={handleNext} disabled={page >= totalPages}>
                    Next
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
