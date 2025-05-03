import { http, HttpResponse } from 'msw';

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export const handlers = [
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      token: 'mock-token',
      user: {
        id: '1',
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    // Type assertion to handle the body correctly
    const body = await request.json() as RegisterRequestBody;
    
    return HttpResponse.json({
      token: 'mock-token',
      user: {
        id: '1',
        username: body.username,
        displayName: body.username,
        email: body.email
      }
    });
  }),

  http.get('/api/files', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'test.pdf',
        size: 1024,
        type: 'application/pdf',
        owner: '1',
        uploadDate: new Date().toISOString()
      }
    ]);
  })
];
