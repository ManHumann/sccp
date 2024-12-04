import React, { useState, useEffect } from 'react';
import { Droplet, Flame } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { IoTButton } from './IoTButton';
import { RoomControls } from './RoomControls';
import { TimerState, RoomDevice } from '../types';

const ROOMS = ['bedroom', 'living room', 'kitchen', 'hall'];
const DEVICE_TYPES = ['lights', 'door', 'cctv'];

export function Dashboard() {
  const [commonDevices, setCommonDevices] = useState({
    water: false,
    stove: false,
  });

  const [roomDevices, setRoomDevices] = useState<RoomDevice[]>(() => {
    return ROOMS.flatMap(room =>
      DEVICE_TYPES.map(type => ({
        id: `${type}-${room}`,
        isActive: false,
        room,
      }))
    );
  });

  const [timers, setTimers] = useState<(TimerState & { totalTime: number })[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) => {
        const updatedTimers = currentTimers.map((timer) => ({
          ...timer,
          timeLeft: Math.max(0, timer.timeLeft - 1/60),
        }));

        updatedTimers.forEach((timer) => {
          if (timer.timeLeft <= 0) {
            const deviceName = timer.room 
              ? `${timer.deviceId.split('-')[0]} in ${timer.room}`
              : timer.deviceId;
            
            toast.success(`Timer finished: ${deviceName} has been turned off`, {
              duration: 5000,
            });

            if (timer.room) {
              setRoomDevices(prev => 
                prev.map(device => 
                  device.id === timer.deviceId ? { ...device, isActive: false } : device
                )
              );
            } else {
              setCommonDevices(prev => ({
                ...prev,
                [timer.deviceId]: false,
              }));
            }
          }
        });

        return updatedTimers.filter((timer) => timer.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleCommonDevice = (deviceId: keyof typeof commonDevices) => {
    setCommonDevices(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }));
  };

  const toggleRoomDevice = (deviceId: string, room: string) => {
    setRoomDevices(prev =>
      prev.map(device => {
        if (device.id === deviceId) {
          return { ...device, isActive: !device.isActive };
        }
        return device;
      })
    );
  };

  const setCommonTimer = (deviceId: string, minutes: number) => {
    setTimers(prev => [
      ...prev.filter(t => t.deviceId !== deviceId),
      { deviceId, timeLeft: minutes, totalTime: minutes },
    ]);
  };

  const setRoomTimer = (deviceId: string, minutes: number, room: string) => {
    setTimers(prev => [
      ...prev.filter(t => t.deviceId !== deviceId),
      { deviceId, timeLeft: minutes, totalTime: minutes, room },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">IoT Management</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Common Controls</h2>
          <div className="grid grid-cols-2 gap-8">
            <IoTButton
              icon={Droplet}
              label="Water"
              isActive={commonDevices.water}
              hasTimer={true}
              timeLeft={timers.find(t => t.deviceId === 'water')?.timeLeft}
              totalTime={timers.find(t => t.deviceId === 'water')?.totalTime}
              onClick={() => toggleCommonDevice('water')}
              onTimerSet={(minutes) => setCommonTimer('water', minutes)}
            />
            
            <IoTButton
              icon={Flame}
              label="Stove"
              isActive={commonDevices.stove}
              hasTimer={true}
              timeLeft={timers.find(t => t.deviceId === 'stove')?.timeLeft}
              totalTime={timers.find(t => t.deviceId === 'stove')?.totalTime}
              onClick={() => toggleCommonDevice('stove')}
              onTimerSet={(minutes) => setCommonTimer('stove', minutes)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map(room => (
            <RoomControls
              key={room}
              room={room}
              devices={roomDevices.filter(device => device.room === room)}
              timers={timers.filter(timer => timer.room === room)}
              onToggle={toggleRoomDevice}
              onTimerSet={setRoomTimer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}