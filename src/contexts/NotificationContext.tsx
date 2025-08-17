import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SharedNotificationService, { SharedNotification } from '../services/SharedNotificationService';

interface Notification {
  id: string;
  type: 'civic_alert' | 'project_update' | 'report_status' | 'champion_message' | 'community_alert' | 'champion_activity' | 'system_notification';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  state?: string;
  lga?: string;
  relatedId?: string;
  isGlobal?: boolean; // Whether this is a community-wide notification
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  addGlobalNotification: (notification: Omit<SharedNotification, 'id' | 'timestamp' | 'readBy'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  getUnreadByType: (type: Notification['type']) => number;
  getCivicAlertsCount: () => number;
  refreshCommunityNotifications: () => void;
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
  console.log('[NotificationProvider] Mounted');

  // Get current user info for community notifications
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  // Load community notifications for current user
  const loadCommunityNotifications = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    const userState = currentUser.state || 'Lagos';
    const userLga = currentUser.lga || 'Lagos Island';
    const userId = currentUser.id || 'anonymous';
    // Subscribe user to their location
    SharedNotificationService.subscribeUser(userId, userState, userLga);
    // Get community notifications for this user's location
    const communityNotifications = SharedNotificationService.getNotificationsForUser(userState, userLga, userId);
    // Convert shared notifications to local notification format
    const convertedNotifications: Notification[] = communityNotifications.map(shared => ({
      id: shared.id,
      type: shared.type as Notification['type'],
      title: shared.title,
      message: shared.message,
      timestamp: new Date(shared.timestamp),
      isRead: shared.readBy.includes(userId),
      priority: shared.priority,
      source: shared.source,
      state: shared.state,
      lga: shared.lga,
      isGlobal: shared.isGlobal
    }));
    console.log('[NotificationProvider] Loaded community notifications:', convertedNotifications);
    // Merge with existing personal notifications
    setNotifications(prev => {
      const personalNotifications = prev.filter(n => !n.isGlobal);
      const allNotifications = [...convertedNotifications, ...personalNotifications];
      // Sort by timestamp and keep only latest 50
      return allNotifications
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 50);
    });
  };

  // Initialize notifications and community data
  useEffect(() => {
    // Initialize demo community data
    SharedNotificationService.initializeDemoData();
    
    // Load existing personal notifications from localStorage
    const savedNotifications = localStorage.getItem('youthGovTrack_notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        const personalNotifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          isGlobal: false // Mark existing notifications as personal
        }));
        setNotifications(personalNotifications);
      } catch (error) {
        console.error('Error loading saved notifications:', error);
      }
    }

    // Load community notifications
    loadCommunityNotifications();

    // Start demo alerts for community simulation
    SharedNotificationService.startDemoAlerts();

    // Listen for new global notifications
    const handleGlobalNotification = (event: any) => {
      loadCommunityNotifications(); // Refresh when new global notification is added
    };

    window.addEventListener('globalNotificationAdded', handleGlobalNotification);

    return () => {
      window.removeEventListener('globalNotificationAdded', handleGlobalNotification);
    };
  }, []);

  // Save personal notifications to localStorage (exclude global ones)
  useEffect(() => {
    const personalNotifications = notifications.filter(n => !n.isGlobal);
    if (personalNotifications.length > 0) {
      localStorage.setItem('youthGovTrack_notifications', JSON.stringify(personalNotifications));
    }
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false,
      isGlobal: false // Personal notifications are not global
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 50));
    console.log('[NotificationProvider] Added personal notification:', newNotification);
  };

  const addGlobalNotification = (notification: Omit<SharedNotification, 'id' | 'timestamp' | 'readBy'>) => {
    // Add to shared notification service for all community members
    SharedNotificationService.addGlobalNotification(notification);
    // Refresh local notifications to include the new global one
    setTimeout(() => loadCommunityNotifications(), 100);
    console.log('[NotificationProvider] Added global notification:', notification);
  };

  const markAsRead = (notificationId: string) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const userId = currentUser.id || 'anonymous';
    
    // Mark as read in shared service if it's a global notification
    const notification = notifications.find(n => n.id === notificationId);
    if (notification?.isGlobal) {
      SharedNotificationService.markAsRead(notificationId, userId);
    }

    // Update local state
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userId = currentUser.id || 'anonymous';
      
      // Mark all global notifications as read
      notifications.filter(n => n.isGlobal && !n.isRead).forEach(n => {
        SharedNotificationService.markAsRead(n.id, userId);
      });
    }

    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const refreshCommunityNotifications = () => {
    loadCommunityNotifications();
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
    addGlobalNotification,
    markAsRead,
    markAllAsRead,
    getUnreadByType,
    getCivicAlertsCount,
    refreshCommunityNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
