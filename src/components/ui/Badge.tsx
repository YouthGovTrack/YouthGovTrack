import React from 'react';
import { cn } from '../../utils/cn';
import { badgeVariants, type BadgeVariants } from '../../utils/variants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
