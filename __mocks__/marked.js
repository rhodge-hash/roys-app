module.exports = {
    marked: {
        parse: jest.fn(markdown => `<p>${markdown}</p>`)
    }
};