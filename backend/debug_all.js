const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const items = await MenuItem.find({}, 'name imageUrl');
        console.log('--- ALL ITEMS START ---');
        items.forEach(item => {
            console.log(`[${item.name}] URL: ${item.imageUrl}`);
        });
        console.log('--- ALL ITEMS END ---');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
