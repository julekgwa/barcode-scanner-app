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
    <main>
      <header>
        <h1>Barcode scanner</h1>
      </header>

      <section>
        {!scannedText && <video width={400} id="videoElementId"></video>}
        {scannedText && <p>Scanned Text: {scannedText}</p>}
      </section>
      <footer>
      <p>Copyright &copy; 2022 <a href="https://github.com/julekgwa">@julekgwa</a>. All rights reserved.</p>
    </footer>
    </main>
  );
}

export default App;