"use client"

import { useEffect, useRef, useState } from "react";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current || !popupContainerRef.current) return;
    
    if (mapRef.current) {
      mapRef.current.setTarget(undefined);
      mapRef.current = null;
    }
    
    try {
      const addressCoordinates = fromLonLat([37.346506, 55.642835]);
      const osmLayer = new TileLayer({
        source: new OSM(),
      });

      const markerFeature = new Feature({
        geometry: new Point(addressCoordinates),
      });
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            scale: 0.5,
          }),
        })
      );
      const vectorSource = new VectorSource({
        features: [markerFeature],
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      const map = new Map({
        target: mapContainerRef.current,
        layers: [osmLayer, vectorLayer],
        view: new View({
          center: addressCoordinates,
          zoom: 16,
          maxZoom: 18,
          minZoom: 2,
        }),
      });
      mapRef.current = map;
      const popup = new Overlay({
        element: popupContainerRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });
      map.addOverlay(popup);
      popup.setPosition(addressCoordinates);
      setMapLoaded(true);
      
    } catch (err: any) {
      setMapError(`Не удалось загрузить карту: ${err.message || 'Неизвестная ошибка'}`);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="h-full w-full relative">
      <div 
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ display: mapError ? 'none' : 'block' }}
      />
      
      <div 
        ref={popupContainerRef} 
        className="ol-popup"
      >
        <div className="popup-content">
          <h4>ЦЕНТР ПОЖТЕХНИКА</h4>
          <p>Установка пожарных систем</p>
        </div>
      </div>
      <style jsx global>{`
        .ol-popup {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          padding: 12px;
          min-width: 240px;
          text-align: center;
          pointer-events: none;
        }
        
        .popup-content h4 {
          margin: 0 0 5px 0;
          font-weight: bold;
          font-size: 16px;
          color: #333;
        }
        
        .popup-content p {
          margin: 0 0 3px 0;
          font-size: 14px;
          color: #666;
        }
        
        .ol-attribution {
          font-size: 12px;
        }
      `}</style>
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p>Загрузка карты...</p>
          </div>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <p className="font-bold mb-1">Не удалось загрузить карту</p>
            <p className="text-sm">{mapError}</p>
            <p className="text-xs mt-2">
              Попробуйте обновить страницу или проверьте подключение к интернету
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

