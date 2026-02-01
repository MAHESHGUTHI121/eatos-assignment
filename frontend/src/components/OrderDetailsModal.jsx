import React from 'react';

export default function OrderDetailsModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

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
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h2>Order Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="order-details-expanded">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <p><strong>Order ID:</strong> #{order.orderNumber}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className={`order-status ${getStatusColor(order.status)}`} style={{ alignSelf: 'center', height: 'fit-content' }}>
                            {order.status}
                        </div>
                    </div>

                    <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                        <div className="detail-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#666', display: 'block' }}>Customer</label>
                            <strong>{order.customerName || 'Walk-in'}</strong>
                        </div>
                        <div className="detail-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#666', display: 'block' }}>Table Number</label>
                            <strong>{order.tableNumber || 'N/A'}</strong>
                        </div>
                    </div>

                    <h3>Items Ordered</h3>
                    <div className="order-items-list" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                        {order.items.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 15px',
                                borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid #eee'
                            }}>
                                <div>
                                    <span>{item.menuItem?.name || 'Unknown Item'}</span>
                                    <span style={{ color: '#666', marginLeft: '10px' }}>x {item.quantity}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{
                            background: '#f8f9fa',
                            padding: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            borderTop: '2px solid #ddd'
                        }}>
                            <span>Total Amount</span>
                            <span style={{ color: 'var(--primary)' }}>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
