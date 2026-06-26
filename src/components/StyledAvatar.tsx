import { Avatar } from '@mui/material';
import type { AvatarProps } from '@mui/material';

interface StyledAvatarProps extends AvatarProps {
  name: string;
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const StyledAvatar: React.FC<StyledAvatarProps> = ({ name, sx, ...other }) => {
  const avatarText = name.includes(' ')
    ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    : name.substring(0, 2).toUpperCase();

  const sxStyles = {
    bgcolor: stringToColor(name),
    ...sx
  };

  return (
    <Avatar sx={sxStyles} {...other}>
      {avatarText}
    </Avatar>
  );
};

export default StyledAvatar;
