import { createNewUser } from '../user';

describe('user handler', () => {
  it('Should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'jr' } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await createNewUser(req, res, () => {});
  });
});
