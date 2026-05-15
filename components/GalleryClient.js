'use client';

import { useState } from 'react';
import { GALLERY } from '@/lib/products';
import CardImage from './CardImage';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'drinkware', label: 'Drinkware' },
  { key: 'wood', label: 'Wood & Kitchen' },
  { key: 'signs', label: 'Signs & Wall Art' },
  { key: 'gifts', label: 'Custom Gifts' },
  { key: 'other', label: 'Other Materials' },
];

export default function GalleryClient() {
  const [filter, setFilter] = useState('all');
  // Production-mode filter: only show pieces with a real photo.
  const visible = GALLERY.filter(
    (g) => g.imageSrc && (filter === 'all' || g.category === filter)
  );

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

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
