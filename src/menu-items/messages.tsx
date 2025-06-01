// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SearchIcon from '@mui/icons-material/Search';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { MessageOutlined, EmailIcon, SendIcon, MenuBookIcon, LibraryBooksIcon, VpnKeyIcon, SearchIcon };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'messages',
      title: <FormattedMessage id="messages" />,
      type: 'collapse',
      icon: icons.MessageOutlined,
      children: [
        {
          id: 'send-message',
          title: <FormattedMessage id="send-message" />,
          type: 'item',
          url: '/messages/send',
          icon: icons.SendIcon
        },
        {
          id: 'view-messages',
          title: <FormattedMessage id="view-messages" />,
          type: 'item',
          url: '/messages/list',
          icon: icons.EmailIcon
        }
      ]
    },
    {
      id: 'books',
      title: <FormattedMessage id="books" />,
      type: 'collapse',
      icon: icons.MenuBookIcon,
      children: [
        {
          id: 'view-books',
          title: <FormattedMessage id="view-books" />,
          type: 'item',
          url: '/books/list',
          icon: icons.LibraryBooksIcon
        },
        {
          id: 'search-books',
          title: <FormattedMessage id="search-books" />,
          type: 'item',
          url: '/books/search',
          icon: icons.SearchIcon
        }
      ]
    },
    {
      id: 'account',
      title: <FormattedMessage id="account" />,
      type: 'collapse',
      icon: icons.VpnKeyIcon,
      children: [
        {
          id: 'change-password',
          title: <FormattedMessage id="change-password" />,
          type: 'item',
          url: '/change-password',
          icon: icons.VpnKeyIcon
        }
      ]
    }
  ]
};

export default pages;
