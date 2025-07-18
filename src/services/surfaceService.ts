
import { SurfaceDevice, SurfaceMetric, MotorData } from '@/types/serviceRequest';

// Base URL for Surface API - in a real app, this would be in .env
const SURFACE_API_URL = import.meta.env.VITE_SURFACE_API_URL || 'https://api.surface-example.com';

// Fetch devices from Surface
export const fetchDevices = async (): Promise<SurfaceDevice[]> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/devices`);
    if (!response.ok) {
      throw new Error(`Error fetching devices: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch devices:', error);
    return [];
  }
};

// Fetch metrics for a specific device
export const fetchDeviceMetrics = async (deviceId: string): Promise<SurfaceMetric[]> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/devices/${deviceId}/metrics`);
    if (!response.ok) {
      throw new Error(`Error fetching device metrics: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch metrics for device ${deviceId}:`, error);
    return [];
  }
};

// Fetch motor data for a specific service request
export const fetchMotorData = async (serviceRequestId: string): Promise<MotorData[]> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/motor-data/${serviceRequestId}`);
    if (!response.ok) {
      throw new Error(`Error fetching motor data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch motor data for service request ${serviceRequestId}:`, error);
    return [];
  }
};

// Send command to a device
export const sendDeviceCommand = async (deviceId: string, command: string, parameters?: Record<string, any>): Promise<boolean> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/devices/${deviceId}/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        parameters: parameters || {},
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error sending command: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error(`Failed to send command to device ${deviceId}:`, error);
    return false;
  }
};

// Update device status
export const updateDeviceStatus = async (deviceId: string, status: 'online' | 'offline' | 'maintenance'): Promise<boolean> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/devices/${deviceId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating device status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error(`Failed to update status for device ${deviceId}:`, error);
    return false;
  }
};

// Testing connection to Surface API
export const testSurfaceConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${SURFACE_API_URL}/ping`);
    return response.ok;
  } catch (error) {
    console.error('Failed to connect to Surface API:', error);
    return false;
  }
};
