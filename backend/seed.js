const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

dotenv.config();

const menuItems = [
    {
        name: 'Spring Rolls',
        category: 'Appetizer',
        price: 5.99,
        description: 'Crispy veggie rolls served with sweet chili sauce.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1544333346-6467069b7fd3?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Garlic Bread',
        category: 'Appetizer',
        price: 4.50,
        description: 'Toasted baguette with herb-infused garlic butter.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd7499705a?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Bruschetta',
        category: 'Appetizer',
        price: 6.99,
        description: 'Grilled bread topped with tomatoes, garlic, and basil.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chicken Wings',
        category: 'Appetizer',
        price: 9.99,
        description: 'Crispy wings tossed in your choice of spicy buffalo or honey BBQ.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80'
    },

    {
        name: 'Margherita Pizza',
        category: 'Main Course',
        price: 12.99,
        description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Pasta Carbonara',
        category: 'Main Course',
        price: 14.50,
        description: 'Creamy spaghetti with pancetta, eggs, and parmesan cheese.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Grilled Salmon',
        category: 'Main Course',
        price: 18.99,
        description: 'Fresh salmon grilled to perfection, served with seasonal vegetables.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Cheeseburger',
        category: 'Main Course',
        price: 11.99,
        description: 'Juicy Angus beef patty with cheddar cheese, lettuce, and tomato.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Steak Frites',
        category: 'Main Course',
        price: 22.50,
        description: 'Choice sirloin steak served with crispy golden fries and garlic butter.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Vegetable Stir Fry',
        category: 'Main Course',
        price: 13.50,
        description: 'Seasonal vegetables sautéed in a savory ginger-soy sauce.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
    },

    {
        name: 'Tiramisu',
        category: 'Dessert',
        price: 6.50,
        description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Cheesecake',
        category: 'Dessert',
        price: 7.00,
        description: 'Creamy New York style cheesecake with a graham cracker crust.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chocolate Cake',
        category: 'Dessert',
        price: 6.50,
        description: 'Decadent triple-layered chocolate cake with ganache frosting.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    },

    {
        name: 'Coke',
        category: 'Beverage',
        price: 2.50,
        description: 'Classic Coca-Cola served chilled with ice.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Iced Tea',
        category: 'Beverage',
        price: 2.50,
        description: 'Freshly brewed house-made iced tea with lemon.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Espresso',
        category: 'Beverage',
        price: 3.00,
        description: 'Single shot of rich, concentrated coffee.',
        isAvailable: true,
        imageUrl: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800&q=80'
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        await MenuItem.deleteMany({});
        await Order.deleteMany({});

        console.log('Cleared existing data');

        console.log('Sample item to insert:', JSON.stringify(menuItems[0], null, 2));
        const createdMenuItems = await MenuItem.insertMany(menuItems);
        console.log('Menu Items seeded');

        // Create some random orders
        const orders = [];
        const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

        for (let i = 0; i < 15; i++) {
            // Randomly select items
            const orderItems = [];
            const numItems = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < numItems; j++) {
                const item = createdMenuItems[Math.floor(Math.random() * createdMenuItems.length)];
                const qty = Math.floor(Math.random() * 2) + 1;
                orderItems.push({
                    menuItem: item._id,
                    quantity: qty,
                    price: item.price
                });
            }

            const totalAmount = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

            orders.push({
                items: orderItems,
                totalAmount,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                customerName: `Customer ${i + 1}`,
                tableNumber: Math.floor(Math.random() * 20) + 1
            });
        }

        await Order.insertMany(orders);
        console.log('Orders seeded');

        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
