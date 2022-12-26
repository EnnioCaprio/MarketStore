import request from 'supertest';
import testEnv from '../../customConn/testEnv';
import app from '../../app';

let context: testEnv | undefined;

beforeAll(async () => {
    context = await testEnv.build();
})

afterAll(() => {
    return context?.close();
})

describe('users', () => {

    it('add user', async () => {
        await request(app)
        .post('/users')
        .send({ name: "aaa", surname: "bbb" })
        .expect(200)
    })

    it('get users', async () => {
        const abc = await request(app)
        .get('/users')
        .expect(200)

        console.log("abc", abc.body)
        
        //expect(1 + 1).toBe(2);
    })

})