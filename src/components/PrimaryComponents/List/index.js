import React, { useState, useEffect } from 'react';
import './styles.css'; // Import your CSS file

const PostgresDataComponent = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/get-table-data/');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete-data/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }), // Send id in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to delete row');
            }

            // After successful deletion, fetch updated data
            fetchData();
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className="highlight">{part}</span>
            ) : (
                part
            )
        );
    };

    const filteredData = data.filter(row =>
        row.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="postgres-data-container">
            <h2>PostgreSQL Table Data</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search by question..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="postgres-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Media Name</th>
                        <th>Source</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{getHighlightedText(row.question, searchTerm)}</td>
                            <td>{row.answer}</td>
                            <td>{row.media_name}</td>
                            <td>{row.source}</td>
                            <td>
                                <button onClick={() => handleDelete(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostgresDataComponent;
