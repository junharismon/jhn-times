const { default: slugify } = require('slugify');

module.exports = {
    slug: (title) => {
        const options = {
            replacement: '-',
            remove: /[`~!@#$%^&*()|+-=?;:'",.<>{}[]\/]/gi,
            lower: true,
            strict: false,
            locale: 'en',
            trim: true,
        };
        return slugify(title, options)
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
