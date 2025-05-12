import axios from 'axios';
import { CRUDServer } from '../src/server';
import { validate } from 'uuid';

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

describe('CRUDServer integration tests', () => {
  let server: CRUDServer;

  beforeAll(() => {
    server = new CRUDServer(PORT);
    server.start();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET /api/users → returns users', async () => {
    const user = {
      username: 'alex',
      age: 28,
      hobbies: [],
    };

    const created = await axios.post(`${BASE_URL}/api/users`, user);
    const response = await axios.get(`${BASE_URL}/api/users`);
    
    expect(response.status).toBe(200);
    expect(response.data.data).toEqual([created.data.data]);
  });

  test('POST /api/users → creates a user', async () => {
    const user = {
      username: 'john',
      age: 30,
      hobbies: ['reading'],
    };

    const response = await axios.post(`${BASE_URL}/api/users`, user);

    expect(response.status).toBe(201);
    expect(response.data.data).toHaveProperty('id');
    expect(validate(response.data.data.id)).toBe(true);
    expect(response.data.data).toMatchObject(user);
  });

  test('GET /api/users/:id → returns user by ID', async () => {
    const user = {
      username: 'alice',
      age: 25,
      hobbies: ['music', 'movies'],
    };

    const created = await axios.post(`${BASE_URL}/api/users`, user);
    const userId = created.data.data.id;
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.data.data.id).toBe(userId);
  });
});
