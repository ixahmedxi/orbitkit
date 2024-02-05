'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { twx } from '@/utils/cn';

const Avatar = twx(
  AvatarPrimitive.Root,
)`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`;

const AvatarImage = twx(AvatarPrimitive.Image)`aspect-square h-full w-full`;

const AvatarFallback = twx(
  AvatarPrimitive.Fallback,
)`flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground`;

export { Avatar, AvatarImage, AvatarFallback };
