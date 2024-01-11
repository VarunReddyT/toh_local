import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Upimax() {
    const [images, setImages] = useState([]);
    const [classificationResults, setClassificationResults] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFileChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
        setClassificationResults([]);
    };

    const handlePhoneNumberChange = (e) => {
        const number = e.target.value;
        setPhoneNumber(number);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
    
        if (images.length > 0) {
            const results = [];
    
            for (const image of images) {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('number', phoneNumber);
    
                try {
                    const response = await axios.post('http://127.0.0.1:5000/classify', formData);
                    results.push(response.data);
                } catch (error) {
                    console.error('Error uploading the file:', error.response.data); // Log the error response data
                    results.push({ error: true });
                }
            }
    
            setClassificationResults(results);
        } else {
            console.error('No files selected');
        }
    };
    
    return (
        <div className="GuestUpload">
            <form onSubmit={handleUpload}>
                <h1>Upload Tires</h1>
                <div className="image col-9">
                    <input
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        name="tyre"
                        className="image"
                        multiple
                        required
                    />
                    <br />
                    <label htmlFor="number">Phone number</label>
                    <input type="text" name="number"id="number" value={phoneNumber}onChange={handlePhoneNumberChange}/>
                    <button type="submit" className="btn btn-dark imageSub">
                        Submit
                    </button>
                    <Link to="/guest" className='back'>
                        <button className="btn btn-dark">Go Back</button>
                    </Link>

                </div>
                {classificationResults.length > 0 && (
                    <div className="result">
                        {classificationResults.map((result, index) => (
                            <div key={index}>
                                <p>Result for Image {index + 1}:</p>
                                {result.error ? (
                                    <p>Error uploading the file</p>
                                ) : (
                                    <>
                                        <p>Classification: {result.class}</p>
                                        <p>Confidence: {result.confidence}</p>
                                    </>
                                )}
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}
