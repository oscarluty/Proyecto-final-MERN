import React from 'react';
import camperasData from '../data/camperasData';
import abrigosData from '../data/abrigosData';
import remerasData from '../data/remerasData';

const Article = ({ imgSrc, title, text }) => (
  <article className='w-64 cursor-pointer relative block overflow-hidden rounded-2xl'>
    <figure className='w-full h-96 overflow-hidden'>
      <img className='w-full h-full object-cover' src={imgSrc} alt="Preview" />
    </figure>
    <div className="p-4 bg-white">
      <h2 className='mb-2 text-xl'>{title}</h2>
      <p className='text-sm'>
        {text}
        <a href="#" className="inline-flex text-slate-400 mt-2" title="Read More">
          Comprar 🛒
        </a>
      </p>
    </div>
  </article>
);

export const TarjetaProductos2 = () => (
  <div className="w-full flex justify-center items-start p-8">
    <div className="articles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
      {camperasData.map((article, index) => (
        <Article
          key={`campera-${index}`}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
      {abrigosData.map((article, index) => (
        <Article
          key={`abrigo-${index}`}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
      {remerasData.map((article, index) => (
        <Article
          key={`remera-${index}`}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
    </div>
  </div>
);