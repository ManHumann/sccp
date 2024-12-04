import React from 'react';
import YouTube from 'react-youtube';

interface CCTVModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: string;
}

export function CCTVModal({ isOpen, onClose, room }: CCTVModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold capitalize">{room} CCTV Feed</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="aspect-video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/5lzoxHSn0C0?si=JW80AiSh4RFlt7_m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  );
}