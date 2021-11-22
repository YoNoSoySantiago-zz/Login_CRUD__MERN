import * as helpers from '../src/lib/helpers';


describe('encrypt password', () => {
    test('should return a encrypted hash', async () => {
        const hash1 = await helpers.encryptPassword('12345678');
        const hash2 = await helpers.encryptPassword('87654321');
        expect(hash1).toBeDefined();
        expect(hash1).not.toBe('12345678');
        expect(hash1).not.toBe(hash2);
    });

    test('should return a encrypted hash', async () => {
        const hash1 = await helpers.encryptPassword('12345678');
        const hash2 = await helpers.encryptPassword('12345678');
        expect(hash1).not.toBe(hash2);
    });
});

describe('match password', () => {
    test('should return true', async () => {
        const hash = await helpers.encryptPassword('12345678');
        const result = await helpers.matchPassword('12345678', hash);
        expect(result).toBe(true);
    });

    test('should return false', async () => {
        const hash = await helpers.encryptPassword('12345678');
        const result = await helpers.matchPassword('87654321', hash);
        expect(result).toBe(false);
    });
});