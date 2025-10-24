import React from 'react';
import Head from 'next/head';
import Slider from '@/components/Slider/Slider';
import BookList from '@/components/BookList/BookList';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Книжный магазин - Главная</title>
        <meta name="description" content="Лучший книжный магазин с большим выбором литературы" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-8">
        <Slider />
        <BookList />
      </div>
    </>
  );
};

export default Home;