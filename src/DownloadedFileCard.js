import React, { useEffect, useState } from "react";

const DownloadedFileCard = ({ downloadedFile }) => {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(downloadedFile);
        const htmlContent = await response.text();
        setFileContent(htmlContent);
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchFileContent();
  }, [downloadedFile]);

  return (
    <div className="card">
      <div className="card-header">Downloaded Fileaa</div>
      <div className="card-body">
        {/* Display the downloaded file content */}
        {fileContent ? (
          <div dangerouslySetInnerHTML={{ __html: fileContent }} />
        ) : (
          <p>Loading file content...</p>
        )}
      </div>
    </div>
  );
};

export default DownloadedFileCard;
