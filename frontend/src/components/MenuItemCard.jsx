import React, { useState } from 'react';

export default function MenuItemCard({ item, onDelete, onEdit, onToggleAvailability }) {
    const [isAvailable, setIsAvailable] = useState(item.isAvailable);
    const [loading, setLoading] = useState(false);

    // Challenge 3: Optimistic UI Updates
    const handleToggle = async () => {
        const originalState = isAvailable;
        // Update local state immediately
        setIsAvailable(!originalState);
        if (onToggleAvailability) {
            // Fire parent handler but we handle local UI here mostly visually
            // Actually, to fully demonstrate optimistic UI failure rollback, we might need more control.
            // But usually the parent calls the API. Let's assume the parent passes a function that returns a promise.
            setLoading(true);
            try {
                await onToggleAvailability(item._id, !originalState);
            } catch (err) {
                // Revert on error
                setIsAvailable(originalState);
                alert('Failed to update availability'); // Simple notification
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={`menu-item-card ${!isAvailable ? 'unavailable' : ''}`}>
            <div className="image-container">
                <img
                    src={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={item.name}
                    className="item-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error'; }}
                />
                {!isAvailable && <div className="unavailable-badge">Sold Out</div>}
            </div>
            <div className="item-details">
                <span className="item-category">{item.category}</span>
                <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                <p className="item-desc">{item.description}</p>
                <div className="item-actions">
                    <button
                        className={`btn-toggle ${isAvailable ? 'btn-active' : 'btn-inactive'}`}
                        onClick={handleToggle}
                        disabled={loading}
                    >
                        {isAvailable ? 'Available' : 'Out of Stock'}
                    </button>
                    <div className="action-buttons">
                        <button className="btn-edit" onClick={() => onEdit(item)} title="Edit Item">✎</button>
                        <button className="btn-delete" onClick={() => onDelete(item._id)} title="Delete Item">🗑</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
