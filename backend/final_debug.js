const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const items = await MenuItem.find({}, 'name imageUrl');
        console.log('CHECK_START');
        items.forEach(item => {
            console.log(`Item: ${item.name} | Image: ${item.imageUrl || 'MISSING'}`);
        });
        console.log('CHECK_END');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
