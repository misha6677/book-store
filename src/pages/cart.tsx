import React from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Head>
        <title>Книжный магазин - Корзина</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Ваша корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="border-b last:border-b-0">
                  <div className="p-6 flex items-center space-x-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">Обложка</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.author}</p>
                      <p className="text-blue-600 font-semibold">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Итого:</span>
                <span className="text-2xl font-bold text-blue-600">{totalPrice} ₽</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Очистить корзину
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;