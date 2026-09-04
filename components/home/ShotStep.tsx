import { DeviceShot } from '@/components/home/DeviceShot';
import { Reveal } from '@/components/motion/Reveal';

/** A numbered step illustrated by one real app screen. Shared by KO and EN. */
export function ShotStep({
  n,
  src,
  alt,
  delay,
  children,
}: {
  n: string;
  src: string;
  alt: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-5">
        <DeviceShot src={src} alt={alt} className="mx-auto w-[70%] max-w-[240px] sm:w-full" />
        <div className="flex gap-3">
          <span className="num shrink-0 text-eyebrow text-sage">{n.padStart(2, '0')}</span>
          <p className="text-[16px] leading-[1.7] text-ink">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}
