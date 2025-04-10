import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Reports.css';

const useReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: 'all',
        status: 'all'
    });

    const fetchReports = async () => {
        try {
            setLoading(true);
            // TODO: Implement API call to fetch reports
            // Mock data for now
            const mockReports = [
                {
                    id: 1,
                    title: 'Carbon Credits Report',
                    date: '2024-02-12',
                    type: 'carbon_credits',
                    status: 'completed',
                    summary: 'Monthly carbon credits trading summary'
                },
                {
                    id: 2,
                    title: 'Compliance Report',
                    date: '2024-02-10',
                    type: 'compliance',
                    status: 'pending',
                    summary: 'Quarterly compliance status report'
                }
            ];
            setReports(mockReports);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [filters]);

    return { reports, loading, filters, setFilters };
};

const Reports = () => {
    const { user } = useContext(AuthContext);
    const { reports, loading, filters, setFilters } = useReports();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const downloadReport = (reportId) => {
        // TODO: Implement report download functionality
        console.log('Downloading report:', reportId);
    };

    return (
        <div className="reports-container">
            <h1>Reports</h1>
            
            <div className="filters-section">
                <div className="filter-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <label>Type</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Types</option>
                        <option value="carbon_credits">Carbon Credits</option>
                        <option value="compliance">Compliance</option>
                        <option value="trading">Trading</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading reports...</div>
            ) : (
                <div className="reports-grid">
                    {reports.map(report => (
                        <div key={report.id} className="report-card">
                            <div className="report-header">
                                <h3>{report.title}</h3>
                                <span className={`status ${report.status}`}>
                                    {report.status}
                                </span>
                            </div>
                            <div className="report-content">
                                <p className="date">Date: {report.date}</p>
                                <p className="type">Type: {report.type.replace('_', ' ')}</p>
                                <p className="summary">{report.summary}</p>
                            </div>
                            <div className="report-actions">
                                <button
                                    onClick={() => downloadReport(report.id)}
                                    className="download-button"
                                >
                                    Download Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && reports.length === 0 && (
                <div className="no-reports">
                    No reports found for the selected filters.
                </div>
            )}
        </div>
    );
};

export default Reports;
