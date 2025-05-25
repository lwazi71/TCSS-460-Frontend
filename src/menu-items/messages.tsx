// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // ✅ added for Change Password icon

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { MessageOutlined, EmailIcon, SendIcon, VpnKeyIcon };

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