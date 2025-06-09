'use client';

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, List } from '@mui/material';

//project imports
import SearchBook from 'sections/books/bookSearch';
import { IBook } from 'types/book';
type IBookWithId = IBook & { book_id: string };

import { BookListItem, NoBook } from 'components/BookListItem';

const defaultTheme = createTheme();

const EMPTY_ALERT = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: 'info'
};

export default function BookSearch() {
  const [alert, setAlert] = useState(EMPTY_ALERT);
  const [results, setResults] = useState<IBookWithId[]>([]);

  const onSuccess = (books: IBookWithId[], message: string) => {
    setResults(books);
    setAlert({
      showAlert: true,
      alertMessage: message,
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Search failed: ' + message,
      alertSeverity: 'error'
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
            <SearchBook
              onSuccess={(books, message) => onSuccess(books as IBookWithId[], message)}
              onError={onError}
            />
          </Box>

          <Box sx={{ mt: 4, width: '100%' }}>
            <List>{booksAsComponents.length > 0 ? booksAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
