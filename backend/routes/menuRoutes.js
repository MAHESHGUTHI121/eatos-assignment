const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu - Get all menu items with filtering
router.get('/', async (req, res) => {
    try {
        const { category, isAvailable, minPrice, maxPrice } = req.query;
        const query = {};

        if (category) query.category = category;
        if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const menuItems = await MenuItem.find(query);
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/menu/search?q=query - Search menu items
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Using MongoDB text search
        const menuItems = await MenuItem.find(
            { $text: { $search: q } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/menu/:id - Get single menu item
router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/menu - Create new menu item
router.post('/', async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/menu/:id - Update menu item
router.put('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/menu/:id/availability - Toggle availability
router.patch('/:id/availability', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        // Toggle availability if not provided, or set explicitly if provided in body
        if (req.body.isAvailable !== undefined) {
            menuItem.isAvailable = req.body.isAvailable;
        } else {
            menuItem.isAvailable = !menuItem.isAvailable;
        }

        await menuItem.save();
        res.json(menuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
