import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject, page } = req.query;

  if (!subject) {
    return res.status(400).json({ 
      error: true, 
      message: 'No subject in query params' 
    });
  }

  const pageIndex = page ? parseInt(page as string) : 0;
  const maxResults = 6;

  try {
    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', `Subject:${subject}`);
    gbooksReqParams.set('startIndex', (pageIndex * maxResults).toString());
    gbooksReqParams.set('maxResults', maxResults.toString());

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const booksData = await response.json();
    
    res.status(200).json({
      data: booksData,
    });
  } catch (error) {
    // Используем переменную error
    console.error('Error fetching books:', error);
    res.status(500).json({
      error: true,
      message: 'Something went wrong while fetching books',
    });
  }
}