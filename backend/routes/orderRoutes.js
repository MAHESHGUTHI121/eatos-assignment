const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders/analytics/top-items - Challenge 2: Aggregation for Top 5 Items
router.get('/analytics/top-items', async (req, res) => {
    try {
        const topItems = await Order.aggregate([
            // Unwind items array to process individual items
            { $unwind: '$items' },
            // Group by menuItem id and sum quantities
            {
                $group: {
                    _id: '$items.menuItem',
                    totalQuantity: { $sum: '$items.quantity' }
                }
            },
            // Sort by query quantity descending
            { $sort: { totalQuantity: -1 } },
            // Limit to top 5
            { $limit: 5 },
            // Lookup menu item details
            {
                $lookup: {
                    from: 'menuitems',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'menuItemDetails'
                }
            },
            // Unwind the lookup result (since it returns an array)
            { $unwind: '$menuItemDetails' },
            // Project final structure
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    name: '$menuItemDetails.name',
                    category: '$menuItemDetails.category',
                    price: '$menuItemDetails.price'
                }
            }
        ]);

        res.json(topItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/orders - Get all orders with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const query = {};
        if (status) query.status = status;

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('items.menuItem');

        const count = await Order.countDocuments(query);

        res.json({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalOrders: count
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.menuItem');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
    try {
        const { items, customerName, tableNumber } = req.body;

        // Calculate total amount (assuming frontend sends price, but safer to recalculate if we had access to menu items here easily, 
        // but for this scope we'll trust prices or assume frontend did it right, OR we should fetch locally. 
        // Requirement says: items: Array of { menuItem: ObjectId, quantity: Number, price: Number }
        // We will stick to the schema and calculate totalAmount from items.)

        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = new Order({
            items,
            totalAmount,
            customerName,
            tableNumber
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        // status validation handled by mongoose enum
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
