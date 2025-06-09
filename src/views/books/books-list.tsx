'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
type IBookWithId = IBook & { book_id: string };

import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

const mockBooks: IBookWithId[] = [
  {
    book_id: '1',
    isbn13: 9999999999,
    authors: 'J.K. Rowling, Mary GrandPré',
    publication: 1985,
    original_title: 'fake1',
    title: "Harry Potter and the Philosopher's Stone",
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1474154022m/3.jpg',
      small: 'https://images.gr-assets.com/books/1474154022s/3.jpg'
    }
  },
  {
    book_id: '2',
    isbn13: 9999999998,
    authors: 'Suzanne Collins',
    publication: 1985,
    original_title: 'fake2',
    title: 'The Hunger Games',
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1447303603m/2767052.jpg',
      small: 'https://images.gr-assets.com/books/1447303603s/2767052.jpg'
    }
  },
  {
    book_id: '3',
    isbn13: 9999999997,
    authors: 'Stephenie Meyer',
    publication: 1985,
    original_title: 'fake3',
    title: 'Twilight',
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1361039443m/41865.jpg',
      small: 'https://images.gr-assets.com/books/1361039443s/41865.jpg'
    }
  },
  {
    book_id: '4',
    isbn13: 9999999996,
    authors: 'Harper Lee',
    publication: 1985,
    original_title: 'fake4',
    title: 'To Kill a Mockingbird',
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1361975680m/2657.jpg',
      small: 'https://images.gr-assets.com/books/1361975680s/2657.jpg'
    }
  },
  {
    book_id: '5',
    isbn13: 9999999995,
    authors: 'F. Scott Fitzgerald',
    publication: 1985,
    original_title: 'fake5',
    title: 'The Great Gatsby',
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1490528560m/4671.jpg',
      small: 'https://images.gr-assets.com/books/1490528560s/4671.jpg'
    }
  },
  {
    book_id: '6',
    isbn13: 9999999994,
    authors: 'John Green',
    publication: 1985,
    original_title: 'fake6',
    title: 'The Fault in Our Stars',
    ratings: {
      average: 3,
      count: 5,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1
    },
    icons: {
      large: 'https://images.gr-assets.com/books/1360206420m/11870085.jpg',
      small: 'https://images.gr-assets.com/books/1360206420s/11870085.jpg'
    }
  }
];

export default function BooksList() {
  const [books, setBooks] = React.useState<IBookWithId[]>([]);

  React.useEffect(() => {
    // Always use mockBooks for now
    setBooks(mockBooks);

    // Or optionally use real data if desired:
    // axios
    //   .get('book?limit=5')
    //   .then((response) => {
    //     setBooks(response.data.entries);
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const handleDelete = (isbn13: number) => {
    axios
      .delete('book?isbn13=' + isbn13)
      .then((response) => {
        if (response.status === 200) {
          setBooks((prevBooks) => prevBooks.filter((book) => book.isbn13 !== isbn13));
        }
      })
      .catch((error) => console.error(error));
  };

  const booksAsComponents = books.map((book, index) => (
    <React.Fragment key={'book list item: ' + index}>
      <BookListItem book={book} onDelete={handleDelete} />
      {index < books.length - 1 && <Divider variant="middle" component="li" />}
    </React.Fragment>
  ));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LibraryBooksIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            View Books
          </Typography>
          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
