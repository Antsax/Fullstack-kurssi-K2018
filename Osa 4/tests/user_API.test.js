const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { nonExistingId, blogsInDb, getFirst, usersInDb, users } = require('./test_helper')

describe('users testing', () => {
    beforeEach(async () => {
        await User.remove({})
        const userObjects = users.map(user => new User(user))
        const promiseArray = userObjects.map(user => user.save())
        return await Promise.all(promiseArray)
    })

    test('username is not unique', async () => {
        const usersAtStart = await usersInDb()
        const newUser = {
                username: 'taunoC',
                name: 'tauno',
                password: 'password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await usersInDb()
        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })

    test('password is too short', async () => {
        const usersAtStart = await usersInDb()
        const newUser = {
                username: 'Antsax123',
                name: 'Antwan Hommy',
                password: 'mo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await usersInDb()
        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })

    afterAll(() => {
        server.close()
    })
})