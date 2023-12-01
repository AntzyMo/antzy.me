import clsx from 'clsx'
import NextImage from 'next/image'

interface ImageProps {
  src: string
  alt: string
  className?: string
}
export function Image({ src, alt, className }: ImageProps) {
  return (
    <div className={
      clsx(
        'rounded w-full min-h-200px relative',
        className
      )
    }>
      <NextImage
        alt={alt}
        fill
        src={src}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}
