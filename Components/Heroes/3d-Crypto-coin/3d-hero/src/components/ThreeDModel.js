import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Rings } from "react-loading-icons";

const Model = ({ path }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      path,
      (fbx) => {
        // Set initial rotation to face front view
        fbx.rotation.y = Math.PI / 2; // Rotate 90 degrees around y-axis for front view
        fbx.position.set(0, 0, 0); // Set model position to center

        setModel(fbx);
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );
  }, [path]);

  return model ? <primitive object={model} /> : null;
};

const ThreeDModelFBX = ({ path }) => {
  return (
    <Canvas
      style={{
        position: "relative",
        width: "70rem",
        height: "70rem",
      }}
    >
      {/* Set up the default camera */}
      <PerspectiveCamera makeDefault position={[-30, 300, 300]} />
      <Suspense fallback={<Rings />}>
        {/* Lights */}
        <ambientLight intensity={0.8} /> {/* Ambient light */}
        <spotLight
          intensity={1}
          position={[10, 10, 10]}
          angle={0}
          penumbra={1}
        />
        {/* Spot light */}
        <pointLight position={[-10, -10, -10]} intensity={1} />{" "}
        {/* Point light */}
        {/* 3D Model */}
        <Model path={path} />
        {/* Controls for user interaction */}
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={5}
          enablePan={false} // Enable panning (movement in y and z directions)
          enableZoom={true} // Enable zooming in and out
          maxPolarAngle={Math.PI / 2} // Limit rotation to avoid upside-down view
          minPolarAngle={Math.PI / 2}
          minDistance={28} // Minimum distance the camera can zoom out
          maxDistance={28} // Maximum distance the camera can zoom in
          target={[0, 0, 0]} // Set a target to control the zoom behavior
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeDModelFBX;