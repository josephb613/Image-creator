// 'use client';

// import { useState } from "react";
// import Image from "next/image";

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Home() {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/api/predictions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: e.target.prompt.value,
//       }),
//     });
//     let prediction = await response.json();
//     if (response.status !== 201) {
//       setError(prediction.detail);
//       return;
//     }
//     setPrediction(prediction);

//     while (
//       prediction.status !== "succeeded" &&
//       prediction.status !== "failed"
//     ) {
//       await sleep(1000);
//       const response = await fetch("/api/predictions/" + prediction.id);
//       prediction = await response.json();
//       if (response.status !== 200) {
//         setError(prediction.detail);
//         return;
//       }
//       console.log({ prediction: prediction });
//       setPrediction(prediction);
//     }
//   };

//   return (
//     <div className="container max-w-2xl mx-auto p-5">
//       <h1 className="py-6 text-center font-bold text-2xl">
//         Dream something with{" "}
//         <a href="https://replicate.com/stability-ai/sdxl?utm_source=project&utm_project=getting-started">
//           SDXL
//         </a>
//       </h1>

//       <form className="w-full flex" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="flex-grow"
//           name="prompt"
//           placeholder="Enter a prompt to display an image"
//         />
//         <button className="button" type="submit">
//           Go!
//         </button>
//       </form>

//       {error && <div>{error}</div>}

//       {prediction && (
//         <>
//           {prediction.output && (
//             <div className="image-wrapper mt-5">
//               <Image
//                 src={prediction.output[prediction.output.length - 1]}
//                 alt="output"
//                 sizes="100vw"
//                 height={768}
//                 width={768}
//               />
//             </div>
//           )}
//           <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
//         </>
//       )}
//     </div>
//   );
// }

//  version  


// 'use client';

// import React, { useState, version } from 'react';
// import Image from 'next/image';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function DallE3000() {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/api/predictions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: e.target.prompt.value,
//       }),
//     });
//     let prediction = await response.json();
//     if (response.status !== 201) {
//       setError(prediction.detail);
//       return;
//     }
//     setPrediction(prediction);

//     while (
//       prediction.status !== "succeeded" &&
//       prediction.status !== "failed"
//     ) {
//       await sleep(1000);
//       const response = await fetch("/api/predictions/" + prediction.id);
//       prediction = await response.json();
//       if (response.status !== 200) {
//         setError(prediction.detail);
//         return;
//       }
//       console.log({ prediction: prediction });
//       setPrediction(prediction);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
//       <div className="w-full bg-blue-500 text-white p-6 rounded-lg mb-6 text-center">
//         <h1 className="text-3xl font-bold mb-2">DallE-3000</h1>
//         <p>Le générateur d'images IA le plus avancé de notre époque</p>
//       </div>
      
//       <div className="flex w-full gap-6">
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Décrivez votre image</h2>
//           <form onSubmit={handleSubmit} className="flex flex-col">
//             <textarea
//               className="w-full p-2 border rounded-md mb-4"
//               name="prompt"
//               rows="6"
//               placeholder="Entrez une description détaillée de l'image que vous souhaitez générer..."
//             />
//             <button 
//               type="submit" 
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
//             >
//               Générer l'image
//             </button>
//           </form>
//         </div>
        
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Votre création</h2>
//           {error && <div className="text-red-500">{error}</div>}
//           {prediction && prediction.output && (
//             <div className="w-full aspect-square relative">
//               <Image
//                 src={prediction.output[prediction.output.length - 1]}
//                 alt="Generated image"
//                 layout="fill"
//                 objectFit="contain"
//               />
//             </div>
//           )}
//           {prediction && (
//             <p className="mt-2 text-sm text-gray-500">
//               status: {prediction.status}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function DallE3000() {
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setPredictions([]);

//     const prompt = e.target.prompt.value;
//     const numImages = 3; // Nombre d'images à générer

//     try {
//       const newPredictions = [];
//       for (let i = 0; i < numImages; i++) {
//         const response = await fetch("/api/predictions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ prompt }),
//         });

//         if (response.status !== 201) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         let prediction = await response.json();
//         newPredictions.push(prediction);
//       }

//       setPredictions(newPredictions);

//       // Polling pour chaque prédiction
//       for (let i = 0; i < newPredictions.length; i++) {
//         while (
//           newPredictions[i].status !== "succeeded" &&
//           newPredictions[i].status !== "failed"
//         ) {
//           await sleep(1000);
//           const response = await fetch("/api/predictions/" + newPredictions[i].id);
//           if (response.status !== 200) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const updatedPrediction = await response.json();
//           newPredictions[i] = updatedPrediction;
//           setPredictions([...newPredictions]);
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
//       <div className="w-full bg-blue-500 text-white p-6 rounded-lg mb-6 text-center">
//         <h1 className="text-3xl font-bold mb-2">DallE-3000</h1>
//         <p>Le générateur d'images IA le plus avancé de notre époque</p>
//       </div>
      
//       <div className="flex w-full gap-6">
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Décrivez votre image</h2>
//           <form onSubmit={handleSubmit} className="flex flex-col">
//             <textarea
//               className="w-full p-2 border rounded-md mb-4"
//               name="prompt"
//               rows="6"
//               placeholder="Entrez une description détaillée de l'image que vous souhaitez générer..."
//             />
//             <button 
//               type="submit" 
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Génération en cours...' : 'Générer les images'}
//             </button>
//           </form>
//         </div>
        
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Vos créations</h2>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <div className="grid grid-cols-1 gap-4">
//             {predictions.map((prediction, index) => (
//               <div key={index} className="border p-4 rounded-lg">
//                 {prediction.output && (
//                   <div className="w-full aspect-square relative mb-2">
//                     <Image
//                       src={prediction.output[prediction.output.length - 1]}
//                       alt={`Generated image ${index + 1}`}
//                       layout="fill"
//                       objectFit="contain"
//                     />
//                   </div>
//                 )}
//                 <p className="text-sm text-gray-500">
//                   Status: {prediction.status}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//version avec chargement squelette
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Nouveau composant de squelette
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="w-full aspect-square bg-gray-300 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  </div>
);

export default function DallE3000() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPredictions([]);

    const prompt = e.target.prompt.value;
    const numImages = 1;

    try {
      const newPredictions = [];
      for (let i = 0; i < numImages; i++) {
        const response = await fetch("/api/predictions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (response.status !== 201) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let prediction = await response.json();
        newPredictions.push(prediction);
      }

      setPredictions(newPredictions);

      for (let i = 0; i < newPredictions.length; i++) {
        while (
          newPredictions[i].status !== "succeeded" &&
          newPredictions[i].status !== "failed"
        ) {
          await sleep(1000);
          const response = await fetch("/api/predictions/" + newPredictions[i].id);
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const updatedPrediction = await response.json();
          newPredictions[i] = updatedPrediction;
          setPredictions([...newPredictions]);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <div className="w-full bg-blue-500 text-white p-6 rounded-lg mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">DallE-3000</h1>
        <p>Le générateur d'images IA le plus avancé de notre époque</p>
      </div>

      <div className="flex w-full gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Décrivez votre image</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              name="prompt"
              rows="6"
              placeholder="Entrez une description détaillée de l'image que vous souhaitez générer..."
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Génération en cours..." : "Générer les images"}
            </button>
          </form>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Vos créations</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            {isLoading
              ? // Afficher les squelettes pendant le chargement
                Array(3)
                  .fill(0)
                  .map((_, index) => <SkeletonLoader key={index} />)
              : predictions.map((prediction, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    {prediction.output ? (
                      <div className="w-full aspect-square relative mb-2">
                        <Image
                          src={prediction.output[prediction.output.length - 1]}
                          alt={`Generated image ${index + 1}`}
                          // sizes="100vw"
                          style={{ objectFit: "contain" }}
                          height={768}
                          width={768}
                        />
                      </div>
                    ) : (
                      <SkeletonLoader />
                    )}
                    <p className="text-sm text-gray-500">
                      Status: {prediction.status}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}