import React, { useState, useEffect } from 'react';
import ModelViewer from '../components/ModelViewer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Upload, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function Dashboard() {
    const { token, logout } = useAuth();
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchModels = React.useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_URL}/models`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setModels(data);
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    useEffect(() => {
        fetchModels();
    }, [fetchModels]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('model', file);
        formData.append('name', file.name);

        try {
            await axios.post(`${API_URL}/models/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchModels();
            setFile(null);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const saveState = async (id, config) => {
        try {
            await axios.patch(`${API_URL}/models/${id}/state`, { config }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>3D Object Manager</h1>
                <button onClick={logout} className="btn-logout">Logout</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <div>
                    {selectedModel ? (
                        <div className="viewer-card">
                            <h3>Viewing: {selectedModel.name}</h3>
                            <ModelViewer
                                url={selectedModel.fileUrl}
                                onStateChange={(state) => saveState(selectedModel._id, state)}
                            />
                        </div>
                    ) : (
                        <div className="empty-state">Select a model to begin.</div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <form onSubmit={handleUpload} className="upload-form">
                        <h4>Upload GLB</h4>
                        <input type="file" accept=".glb" onChange={(e) => setFile(e.target.files[0])} />
                        <button type="submit" disabled={uploading || !file}>
                            <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>

                    <div className="model-list">
                        <h4>Your Models</h4>
                        {models.map(m => (
                            <div key={m._id} onClick={() => setSelectedModel(m)} className={`list-item ${selectedModel?._id === m._id ? 'active' : ''}`}>
                                <span>{m.name}</span>
                                <ChevronRight size={16} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
