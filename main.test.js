import { initializeApp } from './main.js'; // Import initializeApp

global.marked = {
    parse: jest.fn(markdown => `<p>${markdown}</p>`)
};

describe('Main Application Logic', () => {
    let appDiv;

    beforeEach(() => {
        // Mock document.addEventListener to prevent automatic execution
        jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
            if (event === 'DOMContentLoaded') {
                // Store the callback but don't execute it yet
                document.DOMContentLoadedCallback = callback;
            }
        });

        document.body.innerHTML = '<div id="app"></div>'; // Set DOM before calling initializeApp
        appDiv = document.getElementById('app');

        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve('# Test Markdown')
            })
        );

        // Call initializeApp directly after DOM is ready
        initializeApp();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        // Clean up the mock
        if (document.addEventListener.mockRestore) {
            document.addEventListener.mockRestore();
        }
    });

    test('should fetch contrib.md and render it as HTML', async () => {
        // Wait for promises to resolve
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(global.fetch).toHaveBeenCalledWith('contrib.md');
        expect(appDiv.innerHTML).toContain('<p># Test Markdown</p>'); // Updated expectation due to marked mock
    });

    test('should display error message if fetching contrib.md fails', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.reject('Fetch error')
        );

        // Re-call initializeApp to run the error path
        initializeApp();

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(appDiv.innerHTML).toContain('<p>Error loading content.</p>');
    });
});