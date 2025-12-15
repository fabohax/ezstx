import React, { useState } from 'react';
import { X, ShoppingCart, QrCode, Wallet } from 'lucide-react';
import Image from 'next/image';

interface Song {
  src: string;
  title: string;
  artist: string;
}

interface BuyTrackModalProps {
  song: Song;
  onClose: () => void;
}

const BuyTrackModal: React.FC<BuyTrackModalProps> = ({ song, onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'wallet' | null>(null);
  const [paymentAddress] = useState('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'); // Example sBTC address

  const handlePurchase = () => {
    setShowPayment(true);
  };

  const handlePaymentMethod = (method: 'qr' | 'wallet') => {
    setPaymentMethod(method);
  };

  const handleWalletConnect = () => {
    // Add wallet connection logic here
    console.log('Connecting wallet for payment');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 select-none">
      <div className="bg-[#111] rounded-lg p-8 max-w-md w-full mx-4 border border-[#333]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {!showPayment ? 'Buy Track' : paymentMethod === 'qr' ? 'Scan to Pay' : 'Connect Wallet'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {!showPayment ? (
          <div className="text-center mb-6">
            <Image src="/zyfr.jpg" height={210} width={210} alt="zyfr-covr" className='mb-3 rounded-md items-center mx-auto'></Image>
            <h3 className="text-xl font-semibold text-white mb-2">{song.title}</h3>
            <p className="text-gray-300 mb-4">by {song.artist}</p>
            <div className="bg-[#111] rounded-lg p-4 mb-4 border-[1px] border-[#333]">
              <p className="text-2xl font-bold text-white">2100 Satoshis</p>
              <p className="text-gray-400 text-sm">High Quality MP3 (sBTC)</p>
            </div>
          </div>
        ) : paymentMethod === null ? (
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Choose Payment Method</h3>
            <div className="space-y-3">
              <button
                onClick={() => handlePaymentMethod('qr')}
                className="w-full bg-[#222] hover:bg-[#222] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <QrCode className="w-5 h-5" />
                <span>Scan QR Code</span>
              </button>
              <button
                onClick={() => handlePaymentMethod('wallet')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        ) : paymentMethod === 'qr' ? (
          <div className="text-center mb-6">
            <div className="bg-white p-4 rounded-lg mb-4 mx-auto w-fit">
              <QrCode size={200} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{song.title}</h3>
            <p className="text-gray-300 mb-2">Scan QR code to pay 2100 sats</p>
            <p className="text-xs text-gray-500 break-all">{paymentAddress}</p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className="bg-[#333] p-8 rounded-lg mb-4">
              <Wallet size={80} className="text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{song.title}</h3>
              <p className="text-gray-300 mb-4">Connect your wallet to pay 2100 sats</p>
              <button
                onClick={handleWalletConnect}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
        
        {!showPayment ? (
          <button
            onClick={handlePurchase}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Purchase Track</span>
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowPayment(false);
                setPaymentMethod(null);
              }}
              className="w-full bg-[#151515] hover:bg-[#222] text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Back
            </button>
            {paymentMethod === 'qr' && (
              <p className="text-xs text-gray-400 text-center">
                Payment will be detected automatically once confirmed on the Stacks network
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyTrackModal;
