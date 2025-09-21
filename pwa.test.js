import { initializeApp } from './main.js'; // Import initializeApp

Object.defineProperty(global, 'navigator', {
    value: {
        serviceWorker: {
            register: jest.fn(() => Promise.resolve({}))
        }
    },
    writable: true
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () => Promise.resolve('# Test Markdown')
    })
);

describe('PWA Installation and Offline Functionality', () => {
    beforeEach(() => {
        // Mock document.addEventListener to prevent automatic execution
        jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
            if (event === 'DOMContentLoaded') {
                // Store the callback but don't execute it yet
                document.DOMContentLoadedCallback = callback;
            }
        });

        document.body.innerHTML = '<div id="app"></div>'; // Set DOM before calling initializeApp

        // Clear all mocks before each test
        jest.clearAllMocks();
        // Call initializeApp directly
        initializeApp();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        // Clean up the mock
        if (document.addEventListener.mockRestore) {
            document.addEventListener.mockRestore();
        }
    });

    test('should register service worker', async () => {
        expect('serviceWorker' in navigator).toBe(true);
        expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');
    });
});