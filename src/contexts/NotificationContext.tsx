import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SharedNotificationService, { SharedNotification } from '../services/SharedNotificationService';

interface Notification {
  id: string;
  type: 'civic_alert' | 'project_update' | 'report_status' | 'community_alert' | 'system_notification';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  state?: string;
  lga?: string;
  relatedId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  addGlobalNotification: (notification: Omit<SharedNotification, 'id' | 'timestamp' | 'readBy'>) => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load all public notifications (no user-specific filtering)
  const loadNotifications = () => {
    // Get all global notifications for public viewing
    const globalNotifications = SharedNotificationService.getNotificationsForUser('Nigeria', 'All');
    
    // Convert shared notifications to local notification format
    const convertedNotifications: Notification[] = globalNotifications.map(shared => ({
      id: shared.id,
      type: shared.type as Notification['type'],
      title: shared.title,
      message: shared.message,
      timestamp: new Date(shared.timestamp),
      priority: shared.priority,
      source: shared.source,
      state: shared.state,
      lga: shared.lga
    }));

    // Sort by timestamp and keep latest 50
    const sortedNotifications = convertedNotifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 50);
    
    setNotifications(sortedNotifications);
  };

  // Initialize notifications
  useEffect(() => {
    // Initialize demo data
    SharedNotificationService.initializeDemoData();
    
    // Load notifications
    loadNotifications();
    
    // Start demo alerts
    SharedNotificationService.startDemoAlerts();

    // Listen for new global notifications
    const handleGlobalNotification = (event: any) => {
      loadNotifications(); // Refresh when new notification is added
    };

    window.addEventListener('globalNotificationAdded', handleGlobalNotification);

    return () => {
      window.removeEventListener('globalNotificationAdded', handleGlobalNotification);
    };
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    // Convert to SharedNotification format and add globally
    const sharedNotification: Omit<SharedNotification, 'id' | 'timestamp'> = {
      type: notification.type === 'project_update' ? 'system_notification' : notification.type as any,
      title: notification.title,
      message: notification.message,
      priority: notification.priority,
      source: notification.source,
      state: notification.state || 'Nigeria',
      lga: notification.lga || 'All',
      isGlobal: true,
      targetAudience: 'all'
    };
    
    addGlobalNotification(sharedNotification);
  };

  const addGlobalNotification = (notification: Omit<SharedNotification, 'id' | 'timestamp' | 'readBy'>) => {
    // Add to shared notification service
    SharedNotificationService.addGlobalNotification(notification);
    // Refresh notifications
    setTimeout(() => loadNotifications(), 100);
  };

  const refreshNotifications = () => {
    loadNotifications();
  };

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    addGlobalNotification,
    refreshNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
