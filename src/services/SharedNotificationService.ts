
interface SharedNotification {
  id: string;
  type: 'community_alert' | 'civic_alert' | 'report_status' | 'champion_activity' | 'system_notification';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  state: string;
  lga: string;
  timestamp: string;
  isGlobal: boolean; // Whether this notification should be visible to all community members
  targetAudience: 'all' | 'state' | 'lga' | 'specific'; // Who should see this notification
  category?: string;
  userId?: string; // ID of the user who created the notification
  readBy: string[]; // Array of user IDs who have read this notification
}

class SharedNotificationService {
  private static readonly GLOBAL_NOTIFICATIONS_KEY = 'youthgovtrack_global_notifications';
  private static readonly USER_SUBSCRIPTIONS_KEY = 'youthgovtrack_user_subscriptions';

  // Add a notification to the global shared pool
  static addGlobalNotification(notification: Omit<SharedNotification, 'id' | 'timestamp' | 'readBy'>): string {
    const newNotification: SharedNotification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      readBy: []
    };

    const globalNotifications = this.getGlobalNotifications();
    globalNotifications.unshift(newNotification);

    // Keep only the latest 100 global notifications to prevent localStorage overflow
    if (globalNotifications.length > 100) {
      globalNotifications.splice(100);
    }

    localStorage.setItem(this.GLOBAL_NOTIFICATIONS_KEY, JSON.stringify(globalNotifications));
    
    // Trigger a custom event to notify all components of new notification
    window.dispatchEvent(new CustomEvent('globalNotificationAdded', { 
      detail: newNotification 
    }));

    return newNotification.id;
  }

  // Get notifications relevant to a specific user based on their location
  static getNotificationsForUser(userState: string, userLga: string, userId?: string): SharedNotification[] {
    const globalNotifications = this.getGlobalNotifications();
    
    return globalNotifications.filter(notification => {
      // Always include system notifications
      if (notification.type === 'system_notification') {
        return true;
      }

      // Filter based on target audience and user location
      switch (notification.targetAudience) {
        case 'all':
          return true;
        case 'state':
          return notification.state.toLowerCase() === userState.toLowerCase();
        case 'lga':
          return notification.state.toLowerCase() === userState.toLowerCase() && 
                 notification.lga.toLowerCase() === userLga.toLowerCase();
        case 'specific':
          return notification.userId === userId;
        default:
          return false;
      }
    });
  }

  // Mark notification as read by a user
  static markAsRead(notificationId: string, userId: string): void {
    const globalNotifications = this.getGlobalNotifications();
    const notification = globalNotifications.find(n => n.id === notificationId);
    
    if (notification && !notification.readBy.includes(userId)) {
      notification.readBy.push(userId);
      localStorage.setItem(this.GLOBAL_NOTIFICATIONS_KEY, JSON.stringify(globalNotifications));
    }
  }

  // Get unread count for a user
  static getUnreadCount(userState: string, userLga: string, userId?: string): number {
    const userNotifications = this.getNotificationsForUser(userState, userLga, userId);
    return userNotifications.filter(n => userId && !n.readBy.includes(userId)).length;
  }

  // Subscribe user to receive notifications for their area
  static subscribeUser(userId: string, userState: string, userLga: string): void {
    const subscriptions = this.getUserSubscriptions();
    subscriptions[userId] = {
      state: userState,
      lga: userLga,
      subscribedAt: new Date().toISOString()
    };
    localStorage.setItem(this.USER_SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
  }

  // Create system-wide notifications (admin function)
  static createSystemNotification(title: string, message: string, priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'): void {
    this.addGlobalNotification({
      type: 'system_notification',
      title,
      message,
      priority,
      source: 'YouthGovTrack System',
      state: 'Nigeria',
      lga: 'All',
      isGlobal: true,
      targetAudience: 'all'
    });
  }

  // Create champion activity notifications
  static createChampionActivity(championName: string, activity: string, state: string, lga: string): void {
    this.addGlobalNotification({
      type: 'champion_activity',
      title: `Champion Activity: ${championName}`,
      message: activity,
      priority: 'medium',
      source: championName,
      state,
      lga,
      isGlobal: true,
      targetAudience: 'lga'
    });
  }

  // Simulate real-time community alerts
  static simulateRandomCommunityAlerts(): void {
    const alerts = [
      {
        title: "Road Closure Alert",
        message: "Major road construction causing traffic delays on Ikeja-Agege road. Alternative routes recommended.",
        state: "Lagos",
        lga: "Ikeja",
        source: "Lagos State Traffic Management"
      },
      {
        title: "Water Supply Interruption",
        message: "Scheduled maintenance will interrupt water supply in Victoria Island area from 6 AM - 2 PM today.",
        state: "Lagos",
        lga: "Victoria Island",
        source: "Lagos Water Corporation"
      },
      {
        title: "Healthcare Facility Update",
        message: "New maternal health center opened in Garki district. Free consultations available this week.",
        state: "FCT",
        lga: "Garki",
        source: "FCT Health Department"
      },
      {
        title: "School Infrastructure Progress",
        message: "Construction of new primary school in Wuse 2 is 70% complete. Expected opening next semester.",
        state: "FCT",
        lga: "Wuse",
        source: "Champion Amina Suleiman"
      }
    ];

    // Randomly add one of these alerts every 30-60 seconds
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    this.addGlobalNotification({
      type: 'civic_alert',
      title: randomAlert.title,
      message: randomAlert.message,
      priority: 'medium',
      source: randomAlert.source,
      state: randomAlert.state,
      lga: randomAlert.lga,
      isGlobal: true,
      targetAudience: 'lga'
    });
  }

  // Private helper methods
  private static getGlobalNotifications(): SharedNotification[] {
    const stored = localStorage.getItem(this.GLOBAL_NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private static getUserSubscriptions(): Record<string, any> {
    const stored = localStorage.getItem(this.USER_SUBSCRIPTIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  private static generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Initialize demo data (call this once when app starts)
  static initializeDemoData(): void {
    // Add some sample global notifications if none exist
    const existing = this.getGlobalNotifications();
    if (existing.length === 0) {
      const demoNotifications = [
        {
          type: 'system_notification' as const,
          title: '🎉 Welcome to YouthGovTrack!',
          message: 'Thank you for joining our platform. Stay updated with local government projects and community activities.',
          priority: 'medium' as const,
          source: 'YouthGovTrack Team',
          state: 'Nigeria',
          lga: 'All',
          isGlobal: true,
          targetAudience: 'all' as const
        },
        {
          type: 'civic_alert' as const,
          title: 'Community Meeting Scheduled',
          message: 'Town hall meeting scheduled for Saturday 2 PM at Lagos Island Community Center. Discussion on local infrastructure projects.',
          priority: 'medium' as const,
          source: 'Champion Adebayo Ogundimu',
          state: 'Lagos',
          lga: 'Lagos Island',
          isGlobal: true,
          targetAudience: 'lga' as const
        },
        {
          type: 'champion_activity' as const,
          title: 'New Champion Verified',
          message: 'Champion Sarah Abubakar has been verified and is now monitoring healthcare projects in Garki area.',
          priority: 'low' as const,
          source: 'Champion Sarah Abubakar',
          state: 'FCT',
          lga: 'Garki',
          isGlobal: true,
          targetAudience: 'state' as const
        }
      ];

      demoNotifications.forEach(notif => this.addGlobalNotification(notif));
    }
  }

  // Start periodic demo alerts (for demonstration purposes)
  static startDemoAlerts(): void {
    // Add random community alerts every 2-3 minutes for demo
    setInterval(() => {
      this.simulateRandomCommunityAlerts();
    }, Math.random() * 60000 + 120000); // 2-3 minutes
  }

  // Clear all notifications (admin function)
  static clearAllNotifications(): void {
    localStorage.removeItem(this.GLOBAL_NOTIFICATIONS_KEY);
    localStorage.removeItem(this.USER_SUBSCRIPTIONS_KEY);
  }
}

export default SharedNotificationService;
export type { SharedNotification };
