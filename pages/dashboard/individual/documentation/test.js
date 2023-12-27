import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function PDFUpload() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [numPages, setNumPages] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPdfFile(file);
            setPdfUrl('');
        }
    };

    const handleUrlInput = (event) => {
        const url = event.target.value;
        setPdfUrl(url);
        setPdfFile(null);
    };

    const fetchPdfFromUrl = async () => {
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            setPdfFile(blob);
        } catch (error) {
            console.error('Error fetching PDF from URL:', error);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="mt-24">
            <input type="file" onChange={handleFileUpload} />
            <input
                type="text"
                placeholder="Enter PDF URL"
                value={pdfUrl}
                onChange={handleUrlInput}
            />
            <button onClick={fetchPdfFromUrl}>Fetch PDF</button>

            {pdfFile && (
                <div>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        {/* Render PDF pages */}
                    </Document>
                </div>
            )}

            {pdfFile && numPages && (
                <div>
                    Number of Pages: {numPages}
                </div>
            )}
        </div>
    );
}
