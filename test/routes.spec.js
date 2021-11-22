import app from '../src/app';
import request from 'supertest';
import pool from '../src/database.js';
import DatabaseCleaner from 'database-cleaner';

const databaseCleaner = new DatabaseCleaner('mysql');

beforeAll( (done) => {
    databaseCleaner.clean(pool, () => {
        console.log('cleaned');
    });
    done();
});

afterAll( (done) => {
    pool.end();
    done();
});

describe('GET /ValidRoutes', () => {
    test('should return 200', async () => {
        const field = [
            '/',
            '/signin',
            '/signup',
        ]

        for( const route of field ) {
            const response = await request(app).get(route);
            expect(response.statusCode).toBe(200);
        }
    });
});

describe('GET /invalidRoutes', () => {
    test('should return 302: redirect to another url', async () => {
        const field = [
            '/links',
            '/profile',
            '/links/add',
            '/links/edit',
            '/links/delete'
        ]
        for( const route of field ) {
            const response = await request(app).get(route);
            expect(response.status).toBe(302);
            expect(response.header.location).toBe('/signin');
        }
    });
});

describe('POST/validRoutes', () => {
    
    test('should return 302 and redirect to the profile page', async () => {
        const response = await request(app).post('/signup').send(
            {
                fullname: 'Santiago Hurtado Solis',
                username: 'YoNoSoySantiago',
                password: '12345678',
                password2: '12345678'
            });
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/profile');
    });

    test('should return 302 and redirect to the profile page', async () => {
        const response = await request(app).post('/signin').send(
            {
                username: 'YoNoSoySantiago',
                password: '12345678'
            });
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/profile');
    });
});
