'use client';

import { GALLERY } from '@/lib/products';
import CardImage from './CardImage';

export default function GalleryClient() {
  const visible = GALLERY.filter((g) => g.imageSrc);

  return (
    <>
      <div className="grid">
        {visible.map((g, i) => (
          <figure className="card" key={`${g.title}-${i}`}>
            <CardImage src={g.imageSrc} label={g.image} />
            <div className="card-body">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          </figure>
        ))}
      </div>
    </>
  );
}
