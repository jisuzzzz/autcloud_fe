import Image from 'next/image';

type Props = {
  src?: string;
  name?: string;
  color?: string
};

export default function Avatar({ src, name, color }: Props) {
  return (
    <div
      className="relative rounded-full mx-1.5 group"
      // 동적 css
      style={{
        width: '30px',
        height: '30px',
        boxShadow: color
          ? `0 0 0 1px var(--color-background), 0 0 0 3px ${color}`
          : undefined,
      }}
    >
      <Image
        src={src || '/jisu-profile-b.png'}
        height={30}
        width={30}
        alt={name || "user"}
        className="rounded-full"
        style={{
          border: color ? `1px solid var(--color-background)` : undefined,
        }}
      />
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 px-2 py-1 text-white text-xs rounded bg-black/95 whitespace-nowrap pointer-events-none z-50">
        {name}
      </div>
    </div>
  );
}