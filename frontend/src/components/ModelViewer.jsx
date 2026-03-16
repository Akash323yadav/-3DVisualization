import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls } from '@react-three/drei';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1.5} />;
}

export default function ModelViewer({ url, onStateChange, config }) {
    return (
        <div style={{ width: '100%', height: '500px', background: '#0f172a', borderRadius: '1rem', overflow: 'hidden' }}>
            <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <color attach="background" args={['#0f172a']} />
                <Suspense fallback={null}>
                    <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                        <Stage environment="city" intensity={0.6} contactShadow={false}>
                            <Model url={url} />
                        </Stage>
                    </PresentationControls>
                </Suspense>
                <OrbitControls
                    makeDefault
                    onEnd={(e) => {
                        if (onStateChange && e?.target?.object) {
                            onStateChange({
                                cameraPosition: e.target.object.position,
                                cameraRotation: e.target.object.rotation
                            });
                        }
                    }}
                />
            </Canvas>
        </div>
    );
}
