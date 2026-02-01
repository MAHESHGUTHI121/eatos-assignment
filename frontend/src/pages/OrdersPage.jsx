import React, { useState, useEffect } from 'react';
import client from '../api/client';
import OrderRow from '../components/OrderRow';
import OrderDetailsModal from '../components/OrderDetailsModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [analytics, setAnalytics] = useState([]);

    // Modal state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 12 };
            if (statusFilter) params.status = statusFilter;

            const res = await client.get('/orders', { params });
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const res = await client.get('/orders/analytics/top-items');
            setAnalytics(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchAnalytics();
    }, [page, statusFilter]);

    const handleAction = async (id, action) => {
        if (action === 'VIEW_DETAILS') {
            const order = orders.find(o => o._id === id);
            setSelectedOrder(order);
            setIsModalOpen(true);
            return;
        }

        const newStatus = action;
        try {
            // Optimistic update locally
            setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
            await client.patch(`/orders/${id}/status`, { status: newStatus });
        } catch (err) {
            alert('Failed to update status');
            fetchOrders(); // Revert
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Orders Dashboard</h1>
            </div>

            {/* Challenge 2: Top Items Analytics UI */}
            {analytics.length > 0 && (
                <div className="analytics-section" style={{ marginBottom: '30px', padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid #eee' }}>
                    <h3 style={{ margin: 0 }}>🔥 Top Selling Items</h3>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '15px' }}>
                        {analytics.map(item => (
                            <div key={item._id} style={{ border: '1px solid #eee', padding: '10px 15px', borderRadius: '8px', background: '#fff' }}>
                                <strong style={{ color: 'var(--primary)' }}>{item.name}</strong>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.totalQuantity} sold</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="filters-bar" style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '150px' }}
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <div className="pagination" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: 'auto' }}>
                    <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="btn-primary" style={{ padding: '8px 15px' }}>Prev</button>
                    <span style={{ fontWeight: 600 }}>Page {page} of {totalPages}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="btn-primary" style={{ padding: '8px 15px' }}>Next</button>
                </div>
            </div>

            {loading ? <p>Loading orders...</p> : (
                <div className="orders-grid">
                    {orders.map(order => (
                        <OrderRow key={order._id} order={order} onStatusChange={handleAction} />
                    ))}
                </div>
            )}

            {!loading && orders.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No orders found for this filter.</p>}

            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
}

