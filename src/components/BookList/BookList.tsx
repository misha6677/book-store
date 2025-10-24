import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store';
import { setCategory, setSortBy } from '@/store/slices/filterSlice';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
}

// Mock данные для книг
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    price: 450,
    image: '/book1.jpg',
    category: 'classic'
  },
  {
    id: '2',
    title: '1984',
    author: 'Джордж Оруэлл',
    price: 380,
    image: '/book2.jpg',
    category: 'fiction'
  },
  {
    id: '3',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    price: 520,
    image: '/book3.jpg',
    category: 'classic'
  },
  {
    id: '4',
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    price: 490,
    image: '/book4.jpg',
    category: 'classic'
  },
  {
    id: '5',
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    price: 320,
    image: '/book5.jpg',
    category: 'children'
  },
  {
    id: '6',
    title: 'Гарри Поттер и философский камень',
    author: 'Джоан Роулинг',
    price: 670,
    image: '/book6.jpg',
    category: 'fantasy'
  }
];

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector((state: RootState) => state.filters);

  const filteredAndSortedBooks = mockBooks
    .filter(book => category === 'all' || book.category === category)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    }));
  };

  return (
    <div className="flex gap-8">
      {/* Фильтры */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все категории</option>
              <option value="classic">Классика</option>
              <option value="fiction">Фантастика</option>
              <option value="fantasy">Фэнтези</option>
              <option value="children">Детские</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">По названию</option>
              <option value="price">По цене</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список книг */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">Каталог книг</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-20 bg-blue-200 mx-auto mb-2 rounded"></div>
                  <span className="text-sm text-gray-600">Обложка</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">{book.price} ₽</span>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;