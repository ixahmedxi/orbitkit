import { cn } from '@/utils/cn'

/**
 * A primitive component that renders a skeleton.
 * @param props HTML Div Element props.
 * @param props.className The className to apply to the skeleton.
 * @returns The skeleton component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-accent', className)}
      {...props}
    />
  )
}

export { Skeleton }
