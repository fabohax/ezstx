import React from 'react';
import Image from 'next/image';

interface CoverProps {
  src: string;
  alt: string;
  size?: number;
}

const Cover: React.FC<CoverProps> = ({ src, alt, size = 300 }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default Cover;
