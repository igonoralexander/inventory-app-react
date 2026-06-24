import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import stringToColor from '../utils/color';

// This is the robust way to get the props of a component in React/TypeScript.
// It avoids the direct import issue that was causing the crash.
type StyledAvatarProps = React.ComponentProps<typeof Avatar> & {
  name: string;
};

const StyledAvatar = ({ name, sx, ...props }: StyledAvatarProps) => {
  const bgColor = stringToColor(name);

  // Basic algorithm to determine text color for contrast
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const textColor = luma > 128 ? '#000' : '#fff';

  return (
    <Avatar
      sx={{
        bgcolor: bgColor,
        color: textColor,
        ...sx,
      }}
      {...props}
    >
      {name.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default StyledAvatar;
