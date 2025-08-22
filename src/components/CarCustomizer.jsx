import { useEffect, useRef, useState } from "react";
import { Layers } from 'lucide-react';

const toHex = (rgb) => {
    const r = Math.round(rgb[0] * 255);
    const g = Math.round(rgb[1] * 255);
    const b = Math.round(rgb[2] * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const toRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1];
};

export default function CarCustomizer({ carSrc, onClose }) {
    const [parts, setParts] = useState([]);
    const [interiorParts, setInteriorParts] = useState([]);
    const modelViewerRef = useRef();
    const interiorViewerRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);

    const interior = "models/interior.glb";

    // load <model-viewer> script
    useEffect(() => {
        if (!window.customElements.get("model-viewer")) {
            const script = document.createElement("script");
            script.type = "module";
            script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
            document.head.appendChild(script);
        }
    }, []);

    // exterior parts
    useEffect(() => {
        const viewer = modelViewerRef.current;
        if (!viewer) return;

        const handleLoad = () => {
            const materials = viewer.model.materials;
            const partsData = materials.map(material => ({
                name: material.name,
                color: toHex(material.pbrMetallicRoughness.baseColorFactor),
            }));
            setParts(partsData);
        };

        viewer.addEventListener("load", handleLoad);
        return () => viewer.removeEventListener("load", handleLoad);
    }, []);

    useEffect(() => {
        const viewer = interiorViewerRef.current;
        if (!viewer) return;

        const stopOrbit = (ev) => {
            if (ev.detail.source === 'user-interaction') {
                ev.stopPropagation();
                viewer.cameraOrbit = "180deg 53deg 80m";
                viewer.cameraTarget = "0m 10m 100m";
            }
        };

        viewer.addEventListener("camera-change", stopOrbit);

        return () => viewer.removeEventListener("camera-change", stopOrbit);
    }, [modalOpen]);

    // interior parts
    useEffect(() => {
        const viewer = interiorViewerRef.current;
        if (!viewer) return;

        const handleLoad = () => {
            const materials = viewer.model.materials;
            const partsData = materials.map(material => ({
                name: material.name,
                color: toHex(material.pbrMetallicRoughness.baseColorFactor),
            }));
            setInteriorParts(partsData);
        };

        viewer.addEventListener("load", handleLoad);
        return () => viewer.removeEventListener("load", handleLoad);
    }, [modalOpen]);

    const handleColorChange = (partName, newColor) => {
        const viewer = modelViewerRef.current;
        if (!viewer?.model) return;

        const material = viewer.model.materials.find(m => m.name === partName);
        if (material) {
            material.pbrMetallicRoughness.setBaseColorFactor(toRGB(newColor));
        }

        setParts(prev =>
            prev.map(part =>
                part.name === partName ? { ...part, color: newColor } : part
            )
        );
    };

    const handleInteriorColorChange = (partName, newColor) => {
        const viewer = interiorViewerRef.current;
        if (!viewer?.model) return;

        const material = viewer.model.materials.find(m => m.name === partName);
        if (material) {
            material.pbrMetallicRoughness.setBaseColorFactor(toRGB(newColor));
        }

        setInteriorParts(prev =>
            prev.map(part =>
                part.name === partName ? { ...part, color: newColor } : part
            )
        );
    };

    return (
        <div className="car-customizer-container">
            <div className="model-viewer-container">
                <button className="close-button" onClick={() => onClose(false)}>X</button>

                <model-viewer
                    ref={modelViewerRef}
                    src={carSrc}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    environment-image="neutral"
                    style={{ width: "100%", height: "600px" }}
                />
                <button className="interior-button" onClick={() => setModalOpen(true)}>
                    <Layers size={30} />
                </button>
            </div>

            <div className="controls">
                {parts.length > 0 ? (
                    <ul className="parts-list">
                        {parts.map((part) => (
                            <li key={part.name} className="w-30 h-20 bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 m-2 shadow hover:shadow-lg transition-shadow">
                                {part.name
                                    .replace(/[_\.]/g, " ")
                                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                                    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                                    .match(/[A-Za-z]+/g)
                                    ?.filter(word => word.length > 1)
                                    .reduce((acc, word, i) => {
                                        if (i % 2 === 0) {
                                            acc.push(word);
                                        } else {
                                            acc[acc.length - 1] += " " + word;
                                        }
                                        return acc;
                                    }, [])
                                    .map((group, index) => (index < 1 &&
                                        <p key={index} className="text-black text-sm font-medium text-center">
                                            {group.toUpperCase()}
                                        </p>
                                    ))
                                }

                                <input
                                    type="color"
                                    value={part.color}
                                    onChange={(e) =>
                                        handleColorChange(part.name, e.target.value)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading customization options...</p>
                )}
            </div>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setModalOpen(false)}>X</button>

                        <model-viewer
                            ref={interiorViewerRef}
                            src={interior}
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            camera-controls
                            shadow-intensity="1"
                            environment-image="neutral"
                            style={{ width: "100vw", height: "600px" }}
                            camera-target="0m 10m 80m"
                            camera-orbit="180deg 53deg 80m"
                        />
                        <div className="controls">
                            {interiorParts.length > 0 ? (
                                <ul className="parts-list interior ">
                                    {interiorParts.map((part) => (
                                        <li key={part.name} className="w-30 h-20 bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 m-2 shadow hover:shadow-lg transition-shadow">
                                            <p className="text-black text-sm font-medium text-center">
                                                {part.name.toUpperCase() === "P1PHONG4SG1" ? "CABIN" : part.name.toUpperCase()}
                                            </p>
                                            <input
                                                type="color"
                                                value={part.color}
                                                onChange={(e) =>
                                                    handleInteriorColorChange(part.name, e.target.value)
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Loading interior customization...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
