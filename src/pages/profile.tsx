import React, { useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { login, logout } from '@/store/slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Имитация успешной авторизации
    const mockUser = {
      id: '1',
      email: email,
      name: name || 'Пользователь'
    };
    
    dispatch(login({ user: mockUser, token: 'mock-token' }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <>
      <Head>
        <title>Книжный магазин - Профиль</title>
      </Head>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Профиль</h1>

        {isAuthenticated && user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">История заказов</h3>
                <p className="text-gray-600">У вас пока нет заказов</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Вход в аккаунт</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите ваш email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите пароль"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Войти
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;