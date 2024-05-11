import { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function App() {
  const [scannedText, setScannedText] = useState('');

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        codeReader.decodeFromStream(stream, 'videoElementId', (result) => {
          if (result) {
            setScannedText(result.getText());
            codeReader.reset();
          }
        });
      });
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <p>Barcode scanner</p>
      {!scannedText && <video width={400} id="videoElementId"></video>}
      {scannedText && <p>Scanned Text: {scannedText}
      </p>}
    </div>
  );
}

export default App;