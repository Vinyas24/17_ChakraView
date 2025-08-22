import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarCustomizer from "./CarCustomizer";

const carModels = [
  {
    id: 1,
    name: "Ford Fiesta",
    model: "ST-Line",
    price: "₹8,29,990",
    image: "/images/2009-ford-fiesta.webp",
    titltImage: "/nobg/",
    car: "models/car3.glb"
  },
  {
    id: 2,
    name: "Ford Fusion",
    model: "Titanium",
    price: "₹7,50,000",
    image: "/images/fordfusion.webp",
    titltImage: "/nobg/2019-ford-fusion-energi-titanium-101-1557786021-removebg-preview.png",
    car: "models/car2.glb"
  },
  {
    id: 3,
    name: "Ford Explorer",
    model: "SUV",
    price: "₹14,56,895",
    image: "/images/2011fordexplorer.webp",
    titltImage: "/nobg/2026-ford-explorer-tremor-exterior-pr-104-68599997510e0-removebg-preview.png",
    car: "models/car4.glb"
  },
  {
    id: 4,
    name: "Ford Mustang",
    model: "Muscle Car",
    price: "₹59,69,000",
    image: "/images/1965-ford-mustang.webp",
    titltImage: "/nobg/ford_mustang_gt_2013-wide-370x247-removebg-preview.png",
    car: "models/car6.glb"
  },
  {
    id: 5,
    name: "Ford Shelby",
    model: "GT500",
    price: "₹60,29,000",
    image: "/images/2005FordShelby.webp",
    titltImage: "/nobg/78103456-ford-mustang-shelby-gt500-4k-2-removebg-preview.png",
    car: "models/car1.glb"
  },
  {
    id: 6,
    name: "Porsche 911",
    model: "Sports Car",
    price: "₹62,99,000",
    image: "/images/Porsche-911.webp",
    titltImage: "/nobg/360_F_469231916_yBXAlwxLVTAvJ5JkyE2PdnjCOXUp2wwE-removebg-preview.png",
    car: "models/car7.glb"
  },
  {
    id: 7,
    name: "Lamborghini Gallardo",
    model: "Supercar",
    price: "₹62,48,295",
    image: "/images/2009-Lamborghini-Gallardo.webp",
    titltImage: "/nobg/image-removebg-preview.png",
    car: "models/car8.glb"
  },
  {
    id: 8,
    name: "Ford Crown Victoria",
    model: "Vintage",
    price: "₹8,48,295",
    image: "/images/fordclassic.webp",
    titltImage: "/nobg/628fd44e2dd267faac4f241f64d1499b-removebg-preview.png",
    car: "models/car6.glb"
  },
];

function Model() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null); // ✅ State for selected car
  const touchStartX = useRef(null);
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);

  const handleWheel = (e) => {
    e.preventDefault();
    if (isScrolling.current) return;
    isScrolling.current = true;

    if (e.deltaY > 0 || e.deltaX > 0) nextCar();
    else prevCar();

    setTimeout(() => {
      isScrolling.current = false;
    }, 200);
  };

  const handleTouchStart = (e) =>
    (touchStartX.current = e.targetTouches[0].clientX);

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const distance = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) distance > 0 ? nextCar() : prevCar();
    touchStartX.current = null;
  };

  const nextCar = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, carModels.length - 1));
  };

  const prevCar = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToCar = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleCars = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = currentIndex + i;
      if (index >= 0 && index < carModels.length)
        visible.push({ car: carModels[index], offset: i, index });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* If a car is selected, show CarCustomizer */}
      {selectedCar ? (
        <CarCustomizer carSrc={selectedCar.car} onClose={() => setSelectedCar(null)} />
      ) : (
        <>
          <div className="relative flex-1 flex items-center justify-center min-h-[70vh]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
              <div className="absolute inset-0 bg-[url('/images/9522427.webp')] bg-cover bg-center opacity-40"></div>
            </div>
            <div
              ref={scrollRef}
              className="relative z-10 w-full max-w-6xl mx-auto px-4 overflow-hidden"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex items-center justify-center relative h-[450px]">
                {getVisibleCars().map(({ car, offset, index }) => {
                  const isCenter = offset === 0;
                  const isAdjacent = Math.abs(offset) === 1;

                  return (
                    <div
                      key={`${car.id}-${index}`}
                      className={`absolute transition-all duration-500 ease-out cursor-pointer will-change-transform ${isCenter
                          ? "scale-100 z-30 opacity-100"
                          : isAdjacent
                            ? "scale-75 z-20 opacity-70 hover:scale-80"
                            : "scale-50 z-10 opacity-40 hover:scale-55"
                        }`}
                      style={{
                        transform: `translateX(${offset * 500
                          }px) scale(${isCenter ? 1 : isAdjacent ? 0.75 : 0.5
                          })`,
                      }}
                      onClick={() => !isCenter && goToCar(index)}
                    >
                      <div
                        className={`relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 ${isCenter ? "shadow-2xl shadow-blue-500/10" : "shadow-lg"
                          }`}
                      >
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-75 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h3
                              className="font-bold text-lg text-white"
                              onClick={() => goToCar(index)}
                            >
                              {car.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{car.model}</p>
                          </div>
                          <div className="text-blue-400 font-bold text-xl">
                            {car.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={prevCar}
              className="absolute left-8 top-1/2 -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 p-3 rounded-full border border-gray-700/30 transition-all duration-200 z-40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCar}
              className="absolute right-8 top-1/2 -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 p-3 rounded-full border border-gray-700/30 transition-all duration-200 z-40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="relative z-40 pb-8">
            <div className="flex justify-center space-x-2 mb-6">
              {carModels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCar(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "bg-blue-400 w-8"
                      : "bg-gray-600 hover:bg-gray-500 w-2"
                    }`}
                />
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => setSelectedCar(carModels[currentIndex])} // ✅ open customizer
              >
                Customize
              </button>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Model;
