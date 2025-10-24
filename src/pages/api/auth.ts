import { NextApiRequest, NextApiResponse } from 'next';

function validate(email: string, password: string): { error: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { error: true, message: 'Invalid email format' };
  }
  
  if (password.length < 6 || password.length > 9) {
    return { error: true, message: 'Password must be 6-9 characters long' };
  }
  
  return { error: false };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: true, 
      message: 'Only POST method is allowed' 
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      error: true, 
      message: 'Email and password are required' 
    });
  }

  const validatedInfo = validate(email, password);

  if (validatedInfo.error) {
    return res.status(400).json({ 
      error: true, 
      message: validatedInfo.message 
    });
  } else {
    // В реальном приложении здесь была бы проверка в базе данных
    // и генерация настоящего JWT токена
    return res.status(200).json({ 
      success: true, 
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: email,
        name: 'Пользователь'
      }
    });
  }
}