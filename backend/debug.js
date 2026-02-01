const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const names = ['Spring Rolls', 'Garlic Bread', 'Margherita Pizza', 'Espresso'];
        const items = await MenuItem.find({ name: { $in: names } });
        console.log('--- DB CHECK START ---');
        console.log(JSON.stringify(items, null, 2));
        console.log('--- DB CHECK END ---');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
