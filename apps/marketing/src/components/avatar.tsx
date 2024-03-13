import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/primitives';

export const MyAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
