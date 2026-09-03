import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * A real app screenshot in a plain phone frame. Screens live in
 * `public/app/*.webp` — exported from the store-listing set (2026-09-02 build,
 * 1080×1920 → 540 wide). No fake status bar, no invented UI: the frame is a
 * white card with a hairline; the screen is the screen.
 */
export function DeviceShot({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn('ed-device', className)}>
      <Image src={src} alt={alt} width={540} height={960} priority={priority} sizes="(max-width: 640px) 70vw, 260px" />
    </figure>
  );
}
