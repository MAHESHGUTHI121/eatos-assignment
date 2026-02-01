import React, { useState, useEffect } from 'react';
import client from '../api/client';
import MenuItemCard from '../components/MenuItemCard';
import MenuItemModal from '../components/MenuItemModal';
import useDebounce from '../hooks/useDebounce';

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Challenge 1: Debounced Search
    const debouncedSearch = useDebounce(search, 300);

    const fetchItems = async () => {
        setLoading(true);
        setError('');
        try {
            let params = {};

            if (debouncedSearch) {
                const res = await client.get(`/menu/search?q=${debouncedSearch}`);
                setMenuItems(res.data);
            } else {
                if (category) params.category = category;
                const res = await client.get('/menu', { params });
                setMenuItems(res.data);
            }
        } catch (err) {
            setError('Failed to fetch menu items');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [debouncedSearch, category]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await client.delete(`/menu/${id}`);
            setMenuItems(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    const handleToggleAvailability = async (id, isAvailable) => {
        try {
            await client.patch(`/menu/${id}/availability`, { isAvailable });
        } catch (err) {
            throw err; // Re-throw so card can handle rollback
        }
    };

    const handleOpenAddModal = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (editingItem) {
                // Update
                const res = await client.put(`/menu/${editingItem._id}`, formData);
                setMenuItems(prev => prev.map(item => item._id === editingItem._id ? res.data : item));
            } else {
                // Create
                const res = await client.post('/menu', formData);
                setMenuItems(prev => [res.data, ...prev]);
            }
            setIsModalOpen(false);
        } catch (err) {
            alert(`Failed to ${editingItem ? 'update' : 'create'} item: ` + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Menu Management</h1>
                <button className="btn-primary" onClick={handleOpenAddModal}>+ Add Item</button>
            </div>

            <div className="filters-bar">
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search for delicious food..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '400px' }}
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                </select>

                {loading && <div className="loader-sm"></div>}
            </div>

            {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

            {!loading && menuItems.length === 0 && <p>No items found.</p>}

            <div className="menu-grid">
                {menuItems.map(item => (
                    <MenuItemCard
                        key={item._id}
                        item={item}
                        onDelete={handleDelete}
                        onEdit={handleOpenEditModal}
                        onToggleAvailability={handleToggleAvailability}
                    />
                ))}
            </div>

            <MenuItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                item={editingItem}
            />
        </div>
    );
}

