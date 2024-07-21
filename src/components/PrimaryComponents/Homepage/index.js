










// import React, { useState, useRef, useEffect } from 'react';
// import "../../../App.css";

// const Chatbot = () => {
//     const [query, setQuery] = useState('');
//     const [responses, setResponses] = useState([]);
//     const [previousInput, setPreviousInput] = useState(''); // Track previous input
//     const chatEndRef = useRef(null);
//     const [lastTypedWord, setLastTypedWord] = useState('');
//     const [feedback, setFeedback] = useState(null); // Track feedback

//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (query.trim() === '') return;

//         // Add the user's question to the chat
//         setResponses([...responses, { text: query, isUser: true }]);
//         setPreviousInput(query); // Update previous input

//         try {
//             const response = await fetch('http://10.21.1.76:8000/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'X-CSRFToken': getCsrfToken()
//                 },
//                 body: new URLSearchParams({ query: query })
//             });

//             const contentType = response.headers.get('Content-Type');
//             if (contentType && contentType.includes('application/json')) {
//                 const data = await response.json();
//                 const suggestions = data.suggestions || [];
//                 const answers = data.answers || [];
//                 const bestMatches = data.best_matches || [];
//                 const media = data.media_name || []; // Get media data from the response
//                 const ID = data.id || []
//                 console.log('media: ',media)
//                 // console.log('media name: ',media_name)

//                 setResponses(prevResponses => {
//                     let newResponses = [];

//                     // Aggregate all suggestions into one message
//                     if (suggestions.length > 0) {
//                         const suggestionsText = suggestions.join(', '); // Join suggestions into one string
//                         newResponses.push({
//                             text: `Did you mean? ${suggestionsText}`, // Include a question to the user
//                             isUser: false,
//                             isSuggestion: true
//                         });
//                     } else if (answers.length > 0) {
//                         // Add answers and corresponding media to the chat
//                         newResponses = answers.map((answer, idx) => ({
//                             text: answer,
//                             isUser: false,
//                             media: media[idx] || null // Attach the corresponding media
//                         }));
//                     } else if (bestMatches.length > 0) {
//                         // Add best matches to the chat
//                         const bestMatchesText = `Did you mean: ${bestMatches.join(', ')}?`;
//                         newResponses.push({
//                             text: bestMatchesText,
//                             isUser: false,
//                             isBestMatch: true
//                         });
//                     }
//                     // Handle media display
//                     if (data.media_name) {
//                         const imageUrl = `http://10.21.1.76:8000/assets/images/${data.media_name}`;
//                         newResponses.push({
//                             text: '',
//                             media: imageUrl,
//                             isUser: false
//                         });
//                         console.log('url : ',imageUrl)
//                     }

//                     return [...prevResponses, ...newResponses];
//                 });
//             } else {
//                 console.error('Expected JSON response but got something else');
//             }
//         } catch (error) {
//             console.error('Fetch request failed:', error);
//         }
        

//         setQuery('');
//     };


//     // Function to get CSRF token
//     const getCsrfToken = () => {
//         return document.querySelector('[name=csrfmiddlewaretoken]').value;
//     };

//     // Function to handle the 'Enter' key press
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             handleSubmit(e);
//         }
//     };

//     // Function to handle suggestion click
//     const handleSuggestionClick = (suggestion) => {
//         const words = query.split(' ');  // Convert the input string into an array of words
//         const lastWord = words[words.length - 1];

//         // Replace the last typed word with the suggestion
//         if (lastWord === lastTypedWord) {
//             words[words.length - 1] = suggestion;
//         } else {
//             const originalWords = query.split(' ');
//             const originalLastWord = originalWords[originalWords.length - 1];
//             if (originalLastWord === lastTypedWord) {
//                 words[words.length - 1] = suggestion;
//             }
//         }

//         const newQuery = words.join(' ');  // Join the array back into a string
//         setQuery(newQuery);
//         handleSubmit(new Event('submit')); // Submit the new query
//     };

//     // Function to handle feedback submission
//     const handleFeedback = async (feedbackType) => {
//         const feedbackData = {
//             feedback: feedbackType,
//             previousInput: previousInput // Include the previous input in feedback
//         };

//         try {
//             const response = await fetch('http://10.21.1.76:8000/feedback/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCsrfToken()
//                 },
//                 body: JSON.stringify(feedbackData)
//             });

//             if (response.ok) {
//                 setFeedback(`Thank you for your feedback: ${feedbackType}`);
//             } else {
//                 console.error('Feedback submission failed');
//             }
//         } catch (error) {
//             console.error('Fetch request failed:', error);
//         }
//     };

//     // Store the last typed word whenever the query changes
//     useEffect(() => {
//         const words = query.split(' ');  // Convert the input string into an array of words
//         setLastTypedWord(words[words.length - 1]);  // Get the last word
//     }, [query]);

//     // Scroll to the bottom of the chat
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [responses]);

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {responses.map((msg, index) => (
//                     <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'} ${msg.isSuggestion || msg.isBestMatch ? 'suggestion' : ''}`}>
//                         <div className="message-content">
//                             {msg.isSuggestion ? (
//                                 <div>
//                                     Did you mean?
//                                     {msg.text.split(', ').map((suggestion, idx) => (
//                                         <div key={idx}>
//                                             <a href="#" onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</a>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : msg.isBestMatch ? (
//                                 <div>
//                                     Did you mean:
//                                     {msg.text.split(', ').map((bestMatch, idx) => (
//                                         <div key={idx}>
//                                             <a href="#" onClick={() => handleSuggestionClick(bestMatch)}>{bestMatch}</a>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div dangerouslySetInnerHTML={{ __html: msg.text }} />
//                                     {msg.media && <div className="message-media">
//                                         <img style={{width:'20rem'}} src={msg.media} alt="" />
//                                     </div>}
//                                 </>
//                             )}
//                             {(msg.isSuggestion || msg.isBestMatch) && (
//                                 <div className="feedback-buttons">
//                                     <button onClick={() => handleFeedback('helpful')}>Helpful</button>
//                                     <button onClick={() => handleFeedback('not helpful')}>Not Helpful</button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={chatEndRef} />
//             </div>

//             <div className="chat-input">
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Ask a question"
//                 />
//                 <button type="submit" onClick={handleSubmit}>Ask</button>
//             </div>
//             {/* {feedback && <div className="feedback-message">{feedback}</div>} */}
//         </div>
//     );
// };

// export default Chatbot;




















import React, { useState, useRef, useEffect } from 'react';
import "../../../App.css";

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);
    const [previousInput, setPreviousInput] = useState(''); // Track previous input
    const chatEndRef = useRef(null);
    const [lastTypedWord, setLastTypedWord] = useState('');
    const [feedback, setFeedback] = useState(null); // Track feedback

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query.trim() === '') return;

        // Add the user's question to the chat
        setResponses([...responses, { text: query, isUser: true }]);
        setPreviousInput(query); // Update previous input

        try {
            const response = await fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': getCsrfToken()
                },
                body: new URLSearchParams({ query: query })
            });

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                const suggestions = data.suggestions || [];
                const answers = data.answers || [];
                const bestMatches = data.best_matches || [];
                const media = data.media_name || []; // Get media data from the response
                const ID = data.id || []
                console.log('media: ',media)
                // console.log('media name: ',media_name)

                setResponses(prevResponses => {
                    let newResponses = [];

                    // Aggregate all suggestions into one message
                    if (suggestions.length > 0) {
                        const suggestionsText = suggestions.join(', '); // Join suggestions into one string
                        newResponses.push({
                            text: `Did you mean? ${suggestionsText}`, // Include a question to the user
                            isUser: false,
                            isSuggestion: true
                        });
                    } else if (answers.length > 0) {
                        // Add answers and corresponding media to the chat
                        newResponses = answers.map((answer, idx) => ({
                            text: answer,
                            isUser: false,
                            media: media[idx] || null // Attach the corresponding media
                        }));
                    } else if (bestMatches.length > 0) {
                        // Add best matches to the chat
                        const bestMatchesText = `Did you mean: ${bestMatches.join(', ')}?`;
                        newResponses.push({
                            text: bestMatchesText,
                            isUser: false,
                            isBestMatch: true
                        });
                    }
                    // Handle media display
                    if (data.media_name) {
                        const imageUrl = `http://127.0.0.1:8000/assets/images/${data.media_name}`;
                        newResponses.push({
                            text: '',
                            media: imageUrl,
                            isUser: false
                        });
                        console.log('url : ',imageUrl)
                    }

                    return [...prevResponses, ...newResponses];
                });
            } else {
                console.error('Expected JSON response but got something else');
            }
        } catch (error) {
            console.error('Fetch request failed:', error);
        }
        

        setQuery('');
    };


    // Function to get CSRF token
    const getCsrfToken = () => {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    };

    // Function to handle the 'Enter' key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Function to handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        const words = query.split(' ');  // Convert the input string into an array of words
        const lastWord = words[words.length - 1];

        // Replace the last typed word with the suggestion
        if (lastWord === lastTypedWord) {
            words[words.length - 1] = suggestion;
        } else {
            const originalWords = query.split(' ');
            const originalLastWord = originalWords[originalWords.length - 1];
            if (originalLastWord === lastTypedWord) {
                words[words.length - 1] = suggestion;
            }
        }

        const newQuery = words.join(' ');  // Join the array back into a string
        setQuery(newQuery);
        handleSubmit(new Event('submit')); // Submit the new query
    };

    // Function to handle feedback submission
    const handleFeedback = async (feedbackType) => {
        const feedbackData = {
            feedback: feedbackType,
            previousInput: previousInput // Include the previous input in feedback
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/feedback/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify(feedbackData)
            });

            if (response.ok) {
                setFeedback(`Thank you for your feedback: ${feedbackType}`);
                alert('your response has been sent to admin');
            } else {
                console.error('Feedback submission failed');
            }
        } catch (error) {
            console.error('Fetch request failed:', error);
        }
    };

    // Store the last typed word whenever the query changes
    useEffect(() => {
        const words = query.split(' ');  // Convert the input string into an array of words
        setLastTypedWord(words[words.length - 1]);  // Get the last word
    }, [query]);

    // Scroll to the bottom of the chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [responses]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                {responses.map((msg, index) => (
                    <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'} ${msg.isSuggestion || msg.isBestMatch ? 'suggestion' : ''}`}>
                        <div className="message-content">
                            {msg.isSuggestion ? (
                                <div>
                                    Did you mean?
                                    {msg.text.split(', ').map((suggestion, idx) => (
                                        <div key={idx}>
                                            <a href="#" onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</a>
                                        </div>
                                    ))}
                                </div>
                            ) : msg.isBestMatch ? (
                                <div>
                                    Did you mean:
                                    {msg.text.split(', ').map((bestMatch, idx) => (
                                        <div key={idx}>
                                            <a href="#" onClick={() => handleSuggestionClick(bestMatch)}>{bestMatch}</a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    {msg.media && <div className="message-media">
                                        <img style={{width:'20rem'}} src={msg.media} alt="" />
                                    </div>}
                                </>
                            )}
                            {(msg.isSuggestion || msg.isBestMatch) && (
                                <div className="feedback-buttons">
                                    <button onClick={() => handleFeedback('helpful')}>Helpful</button>
                                    <button onClick={() => handleFeedback('not helpful')}>Not Helpful</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question"
                />
                <button type="submit" onClick={handleSubmit}>Ask</button>
            </div>
            {/* {feedback && <div className="feedback-message">{feedback}</div>} */}
        </div>
    );
};

export default Chatbot;
