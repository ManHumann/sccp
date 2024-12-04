export interface TimerState {
  deviceId: string;
  timeLeft: number;
  room?: string;
}

export interface RoomDevice {
  id: string;
  isActive: boolean;
  room: string;
}

export type DeviceType = 'lights' | 'door' | 'cctv';