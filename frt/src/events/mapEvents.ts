// src/events/mapEvents.ts
type Listener = (payload: any) => void;

class EventEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, listener: Listener) {
    (this.listeners[event] ||= []).push(listener);
  }

  off(event: string, listener: Listener) {
    this.listeners[event] = (this.listeners[event] || []).filter((l) => l !== listener);
  }

  emit(event: string, payload?: any) {
    (this.listeners[event] || []).forEach((listener) => listener(payload));
  }
}

export const mapEvents = new EventEmitter();

/** Fire event to open popup for a building by id */
export function fireBuildingPopup(id: string) {
  mapEvents.emit("showBuildingPopup", id);
}
