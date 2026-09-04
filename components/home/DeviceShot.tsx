import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * A real app screenshot in a plain phone frame. Screens live in
 * `public/app/*.webp` — the store-listing set (2026-09-02 build, 1080×1920
 * originals resampled to 640 wide, ~35 KB each). No fake status bar and no
 * invented UI: the frame is a white card with a hairline, and the screen is
 * the screen. Intrinsic size MUST match the file (640×1138) or Next serves a
 * blurry upscale — the first version pointed at a 303px intermediate and the
 * phones rendered as near-empty white slabs.
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
      <Image src={src} alt={alt} width={640} height={1138} priority={priority} sizes="(max-width: 640px) 70vw, 320px" />
    </figure>
  );
}
