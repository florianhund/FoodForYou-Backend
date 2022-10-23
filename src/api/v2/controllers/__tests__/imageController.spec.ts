import SuperTest from '../../../../../__tests__/utils/SuperTest';

const superTest = new SuperTest('/api/v2/images');

describe('GET /images', () => {
  it('should return arr & 200', async () => {
    const response = await superTest.get('');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data.resources)).toBeTruthy();
  });
});

describe('GET /images/:id', () => {
  it('should return object & 200', async () => {
    const response = await superTest.get('/cld-sample-5');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should retrun 404 if id is not found', async () => {
    const response = await superTest.get('/someid');

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});
