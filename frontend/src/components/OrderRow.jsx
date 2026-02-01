import React from 'react';

export default function OrderRow({ order, onStatusChange }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'status-pending';
            case 'Preparing': return 'status-preparing';
            case 'Ready': return 'status-ready';
            case 'Delivered': return 'status-delivered';
            case 'Cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <span className="order-id">#{order.orderNumber?.slice(0, 8) || order._id.slice(-6)}</span>
                <span className={`order-status ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
            <div className="order-info">
                <p><strong>Table:</strong> {order.tableNumber || 'N/A'}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
            </div>
            <div className="order-items">
                {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-line">
                        <span>{item.quantity}x {item.menuItem?.name || 'Unknown Item'}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="order-actions" style={{ display: 'flex', gap: '10px' }}>
                <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order._id, e.target.value)}
                    className="status-select"
                    style={{ flex: 1 }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button
                    className="btn-secondary"
                    style={{ marginTop: '15px', padding: '8px' }}
                    onClick={() => onStatusChange(order._id, 'VIEW_DETAILS')}
                >
                    Details
                </button>
            </div>

        </div>
    );
}
