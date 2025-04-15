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
    
    // Очистка предыдущей карты при перерендере
    if (mapRef.current) {
      // Уничтожаем предыдущий экземпляр карты
      mapRef.current.setTarget(undefined);
      mapRef.current = null;
    }
    
    try {
      // Инициализация OpenLayers карты
      
      // Координаты ул. Скульптора Мухиной, д. 6 [долгота, широта]
      const addressCoordinates = fromLonLat([37.346506, 55.642835]);
      
      // Создаем слой OpenStreetMap
      const osmLayer = new TileLayer({
        source: new OSM(),
      });

      // Создаем маркер
      const markerFeature = new Feature({
        geometry: new Point(addressCoordinates),
      });

      // Устанавливаем стиль маркера
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            scale: 0.5,
          }),
        })
      );
      
      // Создаем источник векторных данных для маркера
      const vectorSource = new VectorSource({
        features: [markerFeature],
      });
      
      // Создаем векторный слой для маркера
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Создаем карту
      const map = new Map({
        target: mapContainerRef.current,
        layers: [osmLayer, vectorLayer],
        view: new View({
          center: addressCoordinates,
          zoom: 16, // Увеличиваем зум для лучшей видимости адреса
          maxZoom: 18,
          minZoom: 2,
        }),
      });

      // Сохраняем экземпляр карты для возможности его уничтожения
      mapRef.current = map;
      
      // Создаем всплывающее окно с информацией
      const popup = new Overlay({
        element: popupContainerRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });
      
      // Добавляем всплывающее окно на карту
      map.addOverlay(popup);

      // Устанавливаем всплывающее окно по координатам маркера
      popup.setPosition(addressCoordinates);

      // Карта загружена
      setMapLoaded(true);
      // OpenLayers карта успешно загружена
      
    } catch (err: any) {
      // Ошибка при создании OpenLayers карты
      setMapError(`Не удалось загрузить карту: ${err.message || 'Неизвестная ошибка'}`);
    }
    
    // Очистка при размонтировании
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="h-full w-full relative">
      {/* Контейнер для карты */}
      <div 
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ display: mapError ? 'none' : 'block' }}
      />
      
      {/* Всплывающее окно с информацией */}
      <div 
        ref={popupContainerRef} 
        className="ol-popup"
      >
        <div className="popup-content">
          <h4>ЦЕНТР ПОЖТЕХНИКА</h4>
          <p>Установка пожарных систем</p>
        </div>
      </div>
      
      {/* Стили для всплывающего окна */}
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
      
      {/* Загрузка и ошибки */}
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

