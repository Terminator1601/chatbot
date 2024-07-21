




// import React, { useState, useEffect } from 'react';
// import './AdminComponent.css';

// const AdminComponent = () => {
//     const [logs, setLogs] = useState([]);
//     const [feedbacks, setFeedbacks] = useState({});  // To store feedback for each log
//     const [newQuestion, setNewQuestion] = useState('');  // State for the new question input
//     const [newAnswer, setNewAnswer] = useState('');      // State for the new answer input
//     const [media, setMedia] = useState('')
//     const [newMedia, setNewMedia] = useState('')
//     const [source, setSource] = useState('')

//     useEffect(() => {
//         fetchFeedbackLogs();
//     }, []);

//     const fetchFeedbackLogs = async () => {
//         try {
//             const response = await fetch('http://10.21.1.76:8000/feedback-logs/', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken'), // Get CSRF token from cookies if needed
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setLogs(data);

//             // Initialize feedback state for each log
//             const initialFeedbacks = {};
//             data.forEach(log => {
//                 initialFeedbacks[log.id] = '';
//             });
//             setFeedbacks(initialFeedbacks);
//         } catch (error) {
//             console.error('Error fetching feedback logs:', error);
//         }
//     };

//     // Function to get CSRF token from cookies
//     const getCookie = (name) => {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             const cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].trim();
//                 if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     };

//     // Handle feedback submission
//     const handleSubmitFeedback = async (logId) => {
//         const feedback = feedbacks[logId];
//         const media_name = newMedia[logId].name

//         if (!feedback.trim()) {
//             alert('Please enter an answer before submitting feedback.');
//             return;
//         }

//         try {
//             // Call the new API endpoint for deletion and insertion
//             const ansSource='website'
//             const response = await fetch('http://10.21.1.76:8000/delete-log/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//                 body: JSON.stringify({
//                     feedback: feedback,
//                     previousInput: logs.find(log => log.id === logId).previous_input,
//                     media: media_name,
//                     source: ansSource,
//                     Id: logId,
//                 }),
//             });
//             console.log(feedback)
//             console.log(logId)
//             console.log('new media:',newMedia)
//             console.log('new media name',newMedia[logId].name)
//             console.log(source)


//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             fetchFeedbackLogs()

//         } catch (error) {
//             console.error('Error submitting feedback:', error);
//         }
//     };

//     const handleRejectFeedback = async (logId) => {
//         const feedback = feedbacks[logId];

//         try {
//             // Call the new API endpoint for deletion and insertion
//             const response = await fetch('http://10.21.1.76:8000/reject-log/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//                 body: JSON.stringify({ id: logId }),
//             });
//             console.log(feedback)
//             console.log(logId)
//             console.log()

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             fetchFeedbackLogs()

//         } catch (error) {
//             console.error('Error submitting feedback:', error);
//         }
//     }


//     // Handle new question and answer submission
//     const handleSubmitNewQuestion = async () => {
//         const source1='web'
//         const new_media= newMedia.name
//         if (!newQuestion.trim() || !newAnswer.trim()) {
//             alert('Please enter both question and answer.');
//             return;
//         }

//         try {
//             const response = await fetch('http://10.21.1.76:8000/add-new-data/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//                 body: JSON.stringify({
//                     question: newQuestion,
//                     answer: newAnswer,
//                     source: source1,
//                     media: new_media,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             // Clear the new question and answer inputs after successful submission
//             setNewQuestion('');
//             setNewAnswer('');
//             setNewMedia('');
//             setSource('');
//             setNewMedia('');
//             alert('data stored successfully')

//             // Optionally refresh the logs
//             fetchFeedbackLogs();
//         } catch (error) {
//             console.error('Error submitting new question:', error);
//         }
//     };

//     const handleMediaUpdate = async (logId) => {
//         const file = newMedia[logId];

//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('logId', logId);
//             console.log('logid: ',logId);

//             try {
//                 const response = await fetch('http://10.21.1.76:8000/add-media/', {
//                     method: 'POST',
//                     body: formData // Include the FormData object as the body
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('File uploaded successfully:', data);
//                     alert('file upoaded successfully now ypu can submit');
//                 } else {
//                     console.error('Error uploading file:', response.statusText);
//                     alert('Error uploading file:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 alert('Error uploading file:', error);
//             }
//         }

//     };
//     const handleNewMediaUpdate = async () => {
//         const file = newMedia;
//         // const logId = 0
//         console.log('file :', file);

//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);
//             // formData.append('logId', logId);

//             try {
//                 const response = await fetch('http://10.21.1.76:8000/add-new-media/', {
//                     method: 'POST',
//                     body: formData // Include the FormData object as the body
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('File uploaded successfully:', data);
//                 } else {
//                     console.error('Error uploading file:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         }
//     };


//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setNewMedia(e.target.files[0]);
//         }
//     };



    

//     const updatePreviousInput = (id, newValue, save = false) => {
//     setLogs(logs.map(log => {
//         if (log.id === id) {
//             if (save) {
//                 // Save the new value to the server or state
//                 // Example: savePreviousInputToServer(id, newValue);
//             }
//             return { ...log, previous_input: newValue, editMode: !save };
//         }
//         return log;
//     }));
// };



//     return (
//         <div className="admin-container">
//             <h2>Feedback Logs</h2>
//             <table className="logs-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Timestamp</th>
//                         <th>Feedback</th>
//                         <th>Unsolved Questions</th>
//                         <th>Enter Answers</th>
//                         <th>Media Name</th>
//                         <th>Submit / Reject</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map(log => (
//                         <tr key={log.id}>
//                         <td>{log.id}</td>
//                         <td>{log.timestamp}</td>
//                         <td>{log.feedback}</td>
//                         <td>
//                                 {/* Toggle between view and edit mode for previous_input */}
//                                 {log.editMode ? (
//                                     <>
//                                         <input
//                                             type="text"
//                                             defaultValue={log.previous_input}
//                                             onChange={(e) => updatePreviousInput(log.id, e.target.value)}
//                                         />
//                                         <button onClick={() => updatePreviousInput(log.id, log.previous_input, true)}>
//                                             Save
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         {log.previous_input}
//                                         <button onClick={() => setLogs(logs.map(l => l.id === log.id ? { ...l, editMode: true } : l))}>
//                                             Edit
//                                         </button>
//                                     </>
//                                 )}
//                             </td>
//                         <td>
//                             <input
//                                 type="text"
//                                 value={feedbacks[log.id]}
//                                 onChange={(e) => setFeedbacks({ ...feedbacks, [log.id]: e.target.value })}
//                                 placeholder="Add answer"
//                             />
//                         </td>
//                         <td>
//                             <label>
//                                 <input
//                                     type="file"
//                                     onChange={(e) => {
//                                         if (e.target.files && e.target.files[0]) {
//                                             setNewMedia({ ...newMedia, [log.id]: e.target.files[0] });
//                                         }
//                                     }}
//                                 />
//                                 <button style={{ backgroundColor: 'green' }} onClick={() => handleMediaUpdate(log.id)} >
//                                     Upload
//                                 </button>
//                             </label>
//                         </td>
//                         <td>
//                             <button onClick={() => handleSubmitFeedback(log.id)}>
//                                 Submit
//                             </button>
//                             <button style={{ backgroundColor: "red" }} onClick={() => handleRejectFeedback(log.id)}>
//                                 Reject
//                             </button>
//                         </td>
//                     </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="new-question-container">
//                 <div className="new-question-container">
//                     <h3>Add New Question and Answer</h3>
//                     <div className="new-question-form">
//                         <input
//                             type="text"
//                             value={newQuestion}
//                             onChange={(e) => setNewQuestion(e.target.value)}
//                             placeholder="Enter question"
//                         />
//                         <input
//                             type="text"
//                             value={newAnswer}
//                             onChange={(e) => setNewAnswer(e.target.value)}
//                             placeholder="Enter answer"
//                         />
//                         <label>
//                             <input
//                                 type="file"
//                                 onChange={handleFileChange}
//                             />
//                             <button
//                                 type="button"
//                                 style={{ backgroundColor: 'green', color: 'white' }}
//                                 onClick={handleNewMediaUpdate}
//                             >
//                                 Upload
//                             </button>
//                         </label>
//                         <button onClick={handleSubmitNewQuestion}>Submit New Question</button>
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// };

// export default AdminComponent;













import React, { useState, useEffect } from 'react';
import './AdminComponent.css';
import Pagination from '../Pagination/index'; // Import the Pagination component

const AdminComponent = () => {
    const [logs, setLogs] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [media, setMedia] = useState('');
    const [newMedia, setNewMedia] = useState('');
    const [source, setSource] = useState('');
    const [renamedFiles, setRenamedFiles] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;

    useEffect(() => {
        fetchFeedbackLogs();
    }, []);

    const fetchFeedbackLogs = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/feedback-logs/', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLogs(data);

            const initialFeedbacks = {};
            data.forEach(log => {
                initialFeedbacks[log.id] = '';
            });
            setFeedbacks(initialFeedbacks);
        } catch (error) {
            console.error('Error fetching feedback logs:', error);
        }
    };

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const handleSubmitFeedback = async (logId) => {
        const feedback = feedbacks[logId];
        const media_name = newMedia[logId]?.name || '';

        if (!feedback.trim()) {
            alert('Please enter an answer before submitting feedback.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/delete-log/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    feedback: feedback,
                    previousInput: logs.find(log => log.id === logId).previous_input,
                    media: media_name,
                    Id: logId,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchFeedbackLogs();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleRejectFeedback = async (logId) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/reject-log/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({ id: logId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchFeedbackLogs();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleSubmitNewQuestion = async () => {
        const source1 = 'web';
        const new_media = newMedia.name;

        if (!newQuestion.trim() || !newAnswer.trim()) {
            alert('Please enter both question and answer.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/add-new-data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    question: newQuestion,
                    answer: newAnswer,
                    source: source1,
                    media: new_media,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setNewQuestion('');
            setNewAnswer('');
            setNewMedia('');
            setSource('');
            alert('Data stored successfully');

            fetchFeedbackLogs();
        } catch (error) {
            console.error('Error submitting new question:', error);
        }
    };

    const handleMediaUpdate = async (logId) => {
        const file = newMedia[logId];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('logId', logId);

            try {
                const response = await fetch('http://127.0.0.1:8000/add-media/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('File uploaded successfully:', data);
                    alert('File uploaded successfully. Now you can submit.');
                } else {
                    console.error('Error uploading file:', response.statusText);
                    alert('Error uploading file:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file:', error);
            }
        }
    };

    const handleNewMediaUpdate = async () => {
        const file = newMedia;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://127.0.0.1:8000/add-new-media/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('File uploaded successfully:', data);
                } else {
                    console.error('Error uploading file:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewMedia(e.target.files[0]);
        }
    };

    const updatePreviousInput = (id, newValue, save = false) => {
        setLogs(logs.map(log => {
            if (log.id === id) {
                if (save) {
                    // Save the updated value to the backend
                }
                return { ...log, previous_input: newValue, editMode: !save };
            }
            return log;
        }));
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate current logs based on current page
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    return (
        <div className="admin-container">
            <h2>Feedback Logs</h2>
            <table className="logs-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Timestamp</th>
                        <th>Feedback</th>
                        <th>Unsolved Questions</th>
                        <th>Enter Answers</th>
                        <th>Media Name</th>
                        <th>Submit / Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.timestamp}</td>
                            <td>{log.feedback}</td>
                            <td>
                                {log.editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            defaultValue={log.previous_input}
                                            onChange={(e) => updatePreviousInput(log.id, e.target.value)}
                                        />
                                        <button onClick={() => updatePreviousInput(log.id, log.previous_input, true)}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {log.previous_input}
                                        <button onClick={() => setLogs(logs.map(l => l.id === log.id ? { ...l, editMode: true } : l))}>
                                            Edit
                                        </button>
                                    </>
                                )}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={feedbacks[log.id]}
                                    onChange={(e) => setFeedbacks({ ...feedbacks, [log.id]: e.target.value })}
                                    placeholder="Add answer"
                                />
                            </td>
                            <td>
                                <label>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setNewMedia({ ...newMedia, [log.id]: e.target.files[0] });
                                            }
                                        }}
                                    />
                                    <button style={{ backgroundColor: 'green' }} onClick={() => handleMediaUpdate(log.id)} >
                                        Upload
                                    </button>
                                </label>
                            </td>
                            <td>
                                <button onClick={() => handleSubmitFeedback(log.id)}>
                                    Submit
                                </button>
                                <button style={{ backgroundColor: "red" }} onClick={() => handleRejectFeedback(log.id)}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                logsPerPage={logsPerPage}
                totalLogs={logs.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            <div className="new-question-container">
                <h3>Add New Question and Answer</h3>
                <div className="new-question-form">
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Enter question"
                    />
                    <input
                        type="text"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="Enter answer"
                    />
                    <label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            style={{ backgroundColor: 'green', color: 'white' }}
                            onClick={handleNewMediaUpdate}
                        >
                            Upload
                        </button>
                    </label>
                    <button onClick={handleSubmitNewQuestion}>Submit New Question</button>
                </div>
            </div>
        </div>
    );
};

export default AdminComponent;




