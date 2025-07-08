import React, {useState, useEffect} from 'react'
import './SearchPopup.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const SearchPopup = ({onClose}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if(term) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/class/classrooms/search?term=${encodeURIComponent(term)}`);
                if(!res.ok) {
                    throw new Error('Network Response was not ok');
                }
                const data = await res.json();
                console.log(data);
                setResults(data.data);
            } catch (error) {
                console.error('Search Failed', error);
                setResults([]);
            }
        }
        else {
            setResults([])
        }
    }

    const handleItemClick = (id) => {
        navigate(`/classes/${id}`);
        onClose();
    }

    return (
        <div className="search-popup">
            <div className="search-popup-content">
                <div className="searchContainer">
                    <input
                        type="text"
                        placeholder="Search for Classsrooms"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="search-popup-close" onClick={onclose}>x</button>
                </div>
                <ul className="search-results">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <li key={result._id} onClick={() => handleItemClick(result._id)}>
                                <span>{result.name}</span>
                            </li>
                        ))
                    ) : (
                        <li>No Results Found</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchPopup