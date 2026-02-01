import React, { useState, useEffect } from 'react';

export default function MenuItemModal({ isOpen, onClose, onSubmit, item }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Main Course',
        price: '',
        imageUrl: '',
        ingredients: '',
        preparationTime: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                description: item.description || '',
                category: item.category || 'Main Course',
                price: item.price || '',
                imageUrl: item.imageUrl || '',
                ingredients: item.ingredients ? item.ingredients.join(', ') : '',
                preparationTime: item.preparationTime || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                category: 'Main Course',
                price: '',
                imageUrl: '',
                ingredients: '',
                preparationTime: ''
            });
        }
    }, [item, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedData = {
            ...formData,
            price: Number(formData.price),
            preparationTime: Number(formData.preparationTime),
            ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i !== '')
        };
        onSubmit(submittedData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Price ($)</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Prep Time (min)</label>
                            <input type="number" name="preparationTime" value={formData.preparationTime} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Ingredients (comma separated)</label>
                        <input name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="e.g. Flour, Sugar, Eggs" />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">{item ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
