import React, { useState } from 'react';
import { Lightbulb, Lock, Unlock, Camera } from 'lucide-react';
import { IoTButton } from './IoTButton';
import { CCTVModal } from './CCTVModal';
import { RoomDevice } from '../types';

interface RoomControlsProps {
  room: string;
  devices: RoomDevice[];
  timers: { deviceId: string; timeLeft: number; totalTime: number }[];
  onToggle: (deviceId: string, room: string) => void;
  onTimerSet: (deviceId: string, minutes: number, room: string) => void;
}

export function RoomControls({ room, devices, timers, onToggle, onTimerSet }: RoomControlsProps) {
  const [isCCTVOpen, setIsCCTVOpen] = useState(false);

  const getIcon = (deviceId: string, isActive: boolean) => {
    if (deviceId.includes('lights')) return Lightbulb;
    if (deviceId.includes('door')) return isActive ? Unlock : Lock;
    if (deviceId.includes('cctv')) return Camera;
    return Lightbulb;
  };

  const handleDeviceClick = (deviceId: string) => {
    if (deviceId.includes('cctv')) {
      setIsCCTVOpen(true);
    } else {
      onToggle(deviceId, room);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 capitalize">{room}</h3>
      <div className="grid grid-cols-3 gap-4">
        {devices.map((device) => {
          const timer = timers.find(t => t.deviceId === device.id);
          return (
            <IoTButton
              key={device.id}
              icon={getIcon(device.id, device.isActive)}
              label={device.id.split('-')[0].charAt(0).toUpperCase() + device.id.split('-')[0].slice(1)}
              isActive={device.isActive}
              hasTimer={device.id.includes('lights')}
              timeLeft={timer?.timeLeft}
              totalTime={timer?.totalTime}
              onClick={() => handleDeviceClick(device.id)}
              onTimerSet={(minutes) => onTimerSet(device.id, minutes, room)}
            />
          );
        })}
      </div>
      <CCTVModal
        isOpen={isCCTVOpen}
        onClose={() => setIsCCTVOpen(false)}
        room={room}
      />
    </div>
  );
}