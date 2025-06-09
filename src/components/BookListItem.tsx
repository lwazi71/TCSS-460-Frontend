import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// project import
import { IBook } from 'types/book';
type IBookWithId = IBook & { book_id: string };

// import PriorityAvatar from 'components/Priority';

export function BookListItem({ book, onDelete }: { book: IBookWithId; onDelete: (isbn13: number) => void }) {
  const router = useRouter();

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/book/${book.book_id}`);
  };

  return (
    <ListItem
      sx={{ minWidth: '500px' }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={book.icons.small || '/placeholder.png'} // Fallback to placeholder if needed
          sx={{ width: 48, height: 72 }}
        />
      </ListItemAvatar>
      {/* <ListItemText primary={book.title} secondary={book.authors} secondaryTypographyProps={{ color: 'gray' }} /> */}
      <ListItemText
        primary={
          <Typography
            onClick={handleTitleClick}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              textDecoration: 'underline',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            {book.title}
          </Typography>
        }
        secondary={book.authors}
        secondaryTypographyProps={{ color: 'gray' }}
      />
    </ListItem>
  );
}

export function NoBook() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No Elements" />
    </ListItem>
  );
}