'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaReact, FaDownload, FaUser, FaBell, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg aspect-square"></div>
);

const promptSuggestions = [
  "Un paysage futuriste avec des gratte-ciels flottants",
  "Un portrait surréaliste mélangeant éléments humains et naturels",
  "Une scène de rue animée dans un style cyberpunk",
  "Un animal fantastique dans une forêt enchantée",
  "Une nature morte avec des objets du quotidien transformés en or"
];

export default function DallE3000() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numImages, setNumImages] = useState(4);
  const [prompt, setPrompt] = useState('');
  const [preset, setPreset] = useState('Cinématique');
  const [style, setStyle] = useState('Dynamique');
  const [contrast, setContrast] = useState('Moyen');
  const [mode, setMode] = useState('Qualité');
  const [dimensions, setDimensions] = useState('1:1');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (isLoading && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Veuillez entrer une description avant de générer des images.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPredictions([]);
    setCountdown(30); // Démarrer le compte à rebours à 30 secondes

    try {
      const newPredictions = [];
      for (let i = 0; i < numImages; i++) {
        const response = await fetch("/api/predictions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (response.status !== 201) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
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
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
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
      setCountdown(0);
    }
  };

  const handleDownload = async (imageUrl, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-generee-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Échec du téléchargement:', error);
      setError('Échec du téléchargement de l&apos;image. Veuillez réessayer.');
    }
  };

  const handleShare = (platform, imageUrl) => {
    let shareUrl;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent("Regardez cette image que j&apos;ai générée !")}`;
        break;
      case 'instagram':
        shareUrl = 'https://www.instagram.com/';
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="p-4 bg-gray-800 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Images Creator  by Joseph Basix ❤️</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
              <FaBell className="text-white" />
            </button>
            <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
              <FaUser className="text-white" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex flex-col md:flex-row flex-1 p-4 container mx-auto">
        <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Préréglage</label>
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                  className="w-full bg-gray-700 rounded p-2 text-sm"
                >
                  <option>Cinématique</option>
                  <option>Artistique</option>
                  <option>Réaliste</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-gray-700 rounded p-2 text-sm"
                >
                  <option>Dynamique</option>
                  <option>Doux</option>
                  <option>Contrasté</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Contraste</label>
                <select
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-full bg-gray-700 rounded p-2 text-sm"
                >
                  <option>Faible</option>
                  <option>Moyen</option>
                  <option>Élevé</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Mode de génération</label>
                <div className="flex">
                  <button
                    className={`flex-1 p-2 rounded-l text-sm ${mode === 'Rapide' ? 'bg-purple-600' : 'bg-gray-700'}`}
                    onClick={() => setMode('Rapide')}
                  >
                    Rapide
                  </button>
                  <button
                    className={`flex-1 p-2 rounded-r text-sm ${mode === 'Qualité' ? 'bg-purple-600' : 'bg-gray-700'}`}
                    onClick={() => setMode('Qualité')}
                  >
                    Qualité
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Dimensions de l&apos;image</label>
                <div className="grid grid-cols-2 gap-2">
                  {['2:3', '1:1', '16:9', 'Plus'].map((dim) => (
                    <button
                      key={dim}
                      className={`p-2 rounded text-sm ${dimensions === dim ? 'bg-purple-600' : 'bg-gray-700'}`}
                      onClick={() => setDimensions(dim)}
                    >
                      {dim}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Nombre d&apos;images</label>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      className={`p-2 rounded text-sm ${numImages === num ? 'bg-purple-600' : 'bg-gray-700'}`}
                      onClick={() => setNumImages(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex flex-col md:flex-row mb-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Entrez une description détaillée de l&apos;image que vous souhaitez générer..."
                className="w-full p-3 bg-gray-800 rounded-lg md:rounded-r-none text-sm"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-sm h-[3rem] flex items-center justify-center gap-2 text-white p-3 rounded-lg md:rounded-l-none mt-2 md:mt-0"
                disabled={isLoading}
              >
                Générer
                <FaReact />
              </button>
            </div>
            {countdown > 0 && (
              <div className="text-sm text-gray-400">
                Génération en cours : {countdown} secondes restantes
              </div>
            )}
          </form>
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading
              ? Array(numImages).fill(0).map((_, index) =>
                 <SkeletonLoader key={index} />)
              : predictions.map((prediction, index) => (
                  <div key={index} className="relative aspect-square group">
                    {prediction.output ? (
                      <>
                        <Image
                          src={prediction.output[prediction.output.length - 1]}
                          alt={`Image générée ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDownload(prediction.output[prediction.output.length - 1], index)}
                            className="bg-purple-600 hover:bg-purple-700 transition-colors p-2 rounded-full"
                            title="Télécharger l&apos;image"
                          >
                            <FaDownload className="text-white" />
                          </button>
                          <button
                            onClick={() => handleShare('facebook', prediction.output[prediction.output.length - 1])}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-full"
                            title="Partager sur Facebook"
                          >
                            <FaFacebook className="text-white" />
                          </button>
                          <button
                            onClick={() => handleShare('twitter', prediction.output[prediction.output.length - 1])}
                            className="bg-blue-400 hover:bg-blue-500 transition-colors p-2 rounded-full"
                            title="Partager sur Twitter"
                          >
                            <FaTwitter className="text-white" />
                          </button>
                          <button
                            onClick={() => handleShare('instagram', prediction.output[prediction.output.length - 1])}
                            className="bg-pink-600 hover:bg-pink-700 transition-colors p-2 rounded-full"
                            title="Ouvrir Instagram"
                          >
                            <FaInstagram className="text-white" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <SkeletonLoader />
                    )}
                  </div>
                ))}
          </div>
          <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Suggestions de prompts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promptSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-sm text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
