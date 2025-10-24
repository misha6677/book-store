import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/slider1.jpg',
    title: 'Новые поступления',
    description: 'Откройте для себя последние книжные новинки'
  },
  {
    id: 2,
    image: '/slider2.jpg',
    title: 'Бестселлеры',
    description: 'Самые популярные книги этого месяца'
  },
  {
    id: 3,
    image: '/slider3.jpg',
    title: 'Скидки до 50%',
    description: 'Специальные предложения на классическую литературу'
  }
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
      {/* Слайды */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-700">
            {/* Заглушка для изображения - в реальном проекте замените на реальные изображения */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
              {slide.title}
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Кнопки навигации */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;