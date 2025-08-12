import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'civic_alert' | 'project_update' | 'report_status' | 'champion_message' | 'community_alert';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  state?: string;
  lga?: string;
  relatedId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  getUnreadByType: (type: Notification['type']) => number;
  getCivicAlertsCount: () => number;
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

  // Initialize with only real report-based notifications (no simulated data)
  useEffect(() => {
    // Load existing notifications from localStorage if any
    const savedNotifications = localStorage.getItem('youthGovTrack_notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Error loading saved notifications:', error);
      }
    }

    // Remove the interval for simulated notifications
    // All notifications will now come from actual report submissions
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('youthGovTrack_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only latest 50 notifications
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getUnreadByType = (type: Notification['type']) => {
    return notifications.filter(n => !n.isRead && n.type === type).length;
  };

  const getCivicAlertsCount = () => {
    return notifications.filter(n => !n.isRead && (n.type === 'civic_alert' || n.type === 'community_alert')).length;
  };

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadByType,
    getCivicAlertsCount
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
