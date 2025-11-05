import React from 'react';
import { CryptoData } from '../types';
import { ArrowUpRightIcon, ArrowDownLeftIcon } from './icons';

interface CryptoTickerProps {
  data: CryptoData[];
  onSelect: (crypto: CryptoData) => void;
}

const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: price > 1 ? 2 : 6,
    });
}

const TickerItem: React.FC<{ item: CryptoData, onSelect: (crypto: CryptoData) => void }> = ({ item, onSelect }) => {
  const isPositive = item.change24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const Icon = isPositive ? ArrowUpRightIcon : ArrowDownLeftIcon;

  return (
    <div 
      className="flex items-center gap-4 px-6 cursor-pointer"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
      aria-label={`View chart for ${item.name}`}
    >
      <span className="font-bold text-sm text-[var(--foreground-secondary)]">{item.symbol}</span>
      <span className="font-semibold text-sm text-[var(--foreground)]">{formatPrice(item.price)}</span>
      <div className={`flex items-center text-sm font-bold ${changeColor}`}>
        <Icon className="w-4 h-4 mr-1"/>
        <span>{item.change24h.toFixed(2)}%</span>
      </div>
    </div>
  );
};

const AstraPhoenixCryptoTicker: React.FC<CryptoTickerProps> = ({ data, onSelect }) => {
  // Duplicate the data for a seamless loop
  const tickerData = [...data, ...data];

  return (
    <div className="bg-[var(--background-secondary)] border-b border-[var(--border)] overflow-hidden whitespace-nowrap py-3 group">
      <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
        {tickerData.map((item, index) => (
          <React.Fragment key={`${item.id}-${index}`}>
            <TickerItem item={item} onSelect={onSelect} />
            <div className="w-px h-6 bg-[var(--border)] self-center" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AstraPhoenixCryptoTicker;
