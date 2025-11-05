import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CryptoData, ChartDataPoint } from '../types';
import { fetchCryptoChartData } from '../services/marketDataService';
import { XIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from './icons';
import AstraPhoenixLoadingSpinner from './LoadingSpinner';

interface PriceChartModalProps {
  crypto: CryptoData;
  onClose: () => void;
}

const SvgChart: React.FC<{ 
  data: ChartDataPoint[], 
  isPositive: boolean,
  onHover: (dataPoint: { x: number; y: number; price: number; timestamp: number } | null) => void 
}> = ({ data, isPositive, onHover }) => {
    const containerRef = useRef<SVGSVGElement>(null);
    const width = 500;
    const height = 200;
    const padding = 20;

    const [timestamps, prices] = useMemo(() => data.reduce<[number[], number[