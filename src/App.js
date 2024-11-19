import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import './App.css';

function App() {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    if (isStreaming) {
      startCamera();
    }
  }, [isStreaming]);

  // Start Camera and Stream to Peer
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      });

      peer.on('signal', data => {
        console.log('Signal data for remote peer:', data);
        // Send `data` to the remote device to establish the connection
      });

      peer.on('stream', remoteStream => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });

      peerRef.current = peer;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Handle connection between peers
  const connectToPeer = signalData => {
    peerRef.current.signal(signalData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>iPhone Camera Streaming</h1>
        <button onClick={() => setIsStreaming(!isStreaming)}>
          {isStreaming ? 'Stop Camera' : 'Start Camera'}
        </button>

        <div className="video-container">
          <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '300px' }} />
          <video ref={remoteVideoRef} autoPlay style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }} />
        </div>
      </header>
    </div>
  );
}

export default App;
