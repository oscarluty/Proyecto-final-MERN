import React from 'react';
import camperasData from '../data/camperasData';
import abrigosData from '../data/abrigosData';
import remerasData from '../data/remerasData';

const Article = ({ imgSrc, title, text }) => (
  <article className='max-w-80 cursor-pointer relative block overflow-hidden rounded-2xl'>
    <figure className='w-full	h-52	overflow-hidden	'>
      <img className='max-w-full origin-center h-full	aspect-video overflow-hidden object-cover' src={imgSrc} alt="Preview" />
    </figure>
    <div className="p-6 bg-white">
      <h2 className='mb-4	text-2xl'>{title}</h2>
      <p>
        {text}
        <a href="#" className="inline-flex text-slate-400" title="Read More">
          Comprar 🛒
        </a>
      </p>
    </div>
  </article>
);

export const TarjetaProductos2 = () => (
  <div className="w-full flex justify-center items-start p-8">
    <div className="articles flex flex-wrap m-auto justify-center max-w-6xl gap-6">
      {camperasData.map((article, index) => (
        <Article
          key={index}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
      {abrigosData.map((article, index) => (
        <Article
          key={index}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
      {remerasData.map((article, index) => (
        <Article
          key={index}
          imgSrc={article.imgSrc}
          title={article.title}
          text={article.text}
        />
      ))}
    </div>
  </div>
);
