import React, { useState, useEffect, useRef } from 'react';
import ArrowLink from './icons/ArrowLink';
import SharedNotificationService, { SharedNotification } from '../services/SharedNotificationService';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  status: 'Health' | 'Alert' | 'Resolved' | 'Ongoing';
  priority: 'high' | 'medium' | 'low';
  type: 'community_alert' | 'civic_alert' | 'report_status' | 'champion_activity' | 'system_notification';
  source: string;
}

const LiveCivicAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [userLocation] = useState({ state: 'Lagos', lga: 'Ikeja' }); // Mock user location
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allAlerts, setAllAlerts] = useState<Alert[]>([]);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'fadeOut' | 'fadeIn'>('idle');
  const [popupNotifications, setPopupNotifications] = useState<Alert[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const DISPLAY_COUNT = 4; // Number of alerts to show at once
  const ROTATION_INTERVAL = 8000; // 8 seconds between rotations
  const POPUP_DURATION = 5000; // 5 seconds for popup notifications

  // Convert SharedNotification to Alert format
  const convertNotificationToAlert = (notification: SharedNotification): Alert => {
    const timeAgo = getTimeAgo(notification.timestamp);
    
    const status = getStatusFromType(notification.type, notification.priority);
    const location = `${notification.lga}, ${notification.state}`;

    return {
      id: notification.id,
      title: notification.title,
      description: notification.message,
      location,
      timeAgo,
      status,
      priority: notification.priority === 'urgent' ? 'high' : notification.priority,
      type: notification.type,
      source: notification.source
    };
  };

  // Get status based on notification type and priority
  const getStatusFromType = (type: SharedNotification['type'], priority: string): Alert['status'] => {
    switch (type) {
      case 'civic_alert':
        return priority === 'urgent' || priority === 'high' ? 'Alert' : 'Ongoing';
      case 'report_status':
        return 'Ongoing';
      case 'system_notification':
        return 'Resolved';
      case 'community_alert':
        return 'Alert';
      default:
        return 'Ongoing';
    }
  };

  // Calculate time ago from timestamp
  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMs = now.getTime() - alertTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) === 1 ? '' : 's'} ago`;
  };

  // Load notifications and convert to alerts
  const loadAlerts = () => {
    const notifications = SharedNotificationService.getNotificationsForUser(
      userLocation.state, 
      userLocation.lga
    );
    
    // Sort notifications first by timestamp (newest first)
    const sortedNotifications = notifications.sort((a, b) => {
      const timeA = new Date(a.timestamp);
      const timeB = new Date(b.timestamp);
      return timeB.getTime() - timeA.getTime();
    });
    
    // Convert sorted notifications to alerts
    const convertedAlerts = sortedNotifications.map(convertNotificationToAlert);

    // Check for new alerts to show popup notifications
    if (allAlerts.length > 0) {
      const newAlerts = convertedAlerts.filter(alert => 
        !allAlerts.some(existingAlert => existingAlert.id === alert.id)
      );
      
      // Show popup for new high priority or urgent alerts
      newAlerts.forEach(alert => {
        if (alert.priority === 'high' || alert.type === 'civic_alert') {
          showPopupNotification(alert);
        }
      });
    }

    setAllAlerts(convertedAlerts);
    
    // Set initial display alerts only if we don't have any alerts yet
    if (alerts.length === 0) {
      const displayAlerts = convertedAlerts.slice(0, DISPLAY_COUNT);
      setAlerts(displayAlerts);
    }
  };

  // Show popup notification for all users
  const showPopupNotification = (alert: Alert) => {
    setPopupNotifications(prev => [...prev, alert]);
    
    // Auto-remove popup after duration
    setTimeout(() => {
      removePopupNotification(alert.id);
    }, POPUP_DURATION);
  };

  // Remove popup notification
  const removePopupNotification = (alertId: string) => {
    setPopupNotifications(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Rotate alerts with animation
  const rotateAlerts = () => {
    if (allAlerts.length <= DISPLAY_COUNT) return;

    // Start fade out
    setTransitionStage('fadeOut');
    setIsAnimating(true);
    
    // After fade out, update content and fade in
    animationRef.current = setTimeout(() => {
      const nextIndex = (currentDisplayIndex + DISPLAY_COUNT) % allAlerts.length;
      const nextAlerts = [];
      
      for (let i = 0; i < DISPLAY_COUNT; i++) {
        const index = (nextIndex + i) % allAlerts.length;
        if (allAlerts[index]) {
          nextAlerts.push(allAlerts[index]);
        }
      }
      
      // Update content
      if (nextAlerts.length > 0) {
        setAlerts(nextAlerts);
        setCurrentDisplayIndex(nextIndex);
      }
      
      // Start fade in
      setTransitionStage('fadeIn');
      
      // Complete transition
      setTimeout(() => {
        setTransitionStage('idle');
        setIsAnimating(false);
      }, 300);
    }, 400);
  };

  // Start/stop rotation interval
  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      rotateAlerts();
    }, ROTATION_INTERVAL);
  };

  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Initialize component
  useEffect(() => {
    // Initialize demo data if needed
    SharedNotificationService.initializeDemoData();
    
    // Load initial alerts
    loadAlerts();

    // Listen for new global notifications
    const handleNewNotification = (event: any) => {
      const newNotification = event.detail;
      
      // Show popup for all users for certain types
      if (newNotification) {
        const newAlert = convertNotificationToAlert(newNotification);
        if (newAlert.priority === 'high' || newAlert.type === 'civic_alert' || newAlert.type === 'community_alert') {
          showPopupNotification(newAlert);
        }
      }
      
      loadAlerts();
    };

    window.addEventListener('globalNotificationAdded', handleNewNotification);

    // Start demo alerts for dynamic content
    SharedNotificationService.startDemoAlerts();

    // Refresh alerts every 30 seconds
    const refreshInterval = setInterval(loadAlerts, 30000);

    return () => {
      window.removeEventListener('globalNotificationAdded', handleNewNotification);
      clearInterval(refreshInterval);
      stopRotation();
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [userLocation.state, userLocation.lga]);

  // Start rotation when alerts are loaded
  useEffect(() => {
    if (allAlerts.length > DISPLAY_COUNT) {
      startRotation();
    } else {
      stopRotation();
    }
    
    return () => stopRotation();
  }, [allAlerts.length]);

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    stopRotation();
  };

  const handleMouseLeave = () => {
    if (allAlerts.length > DISPLAY_COUNT) {
      startRotation();
    }
  };

  // Add some fallback alerts if no notifications are available
  useEffect(() => {
    if (allAlerts.length === 0) {
      const fallbackAlerts: Alert[] = [
        {
          id: 'fallback-1',
          title: 'Welcome to Live Civic Alerts',
          description: 'This section will show real-time updates from your community. Connect with fellow citizens and stay informed!',
          location: `${userLocation.lga}, ${userLocation.state}`,
          timeAgo: 'Just now',
          status: 'Health',
          priority: 'medium',
          type: 'system_notification',
          source: 'YouthGovTrack'
        },
        {
          id: 'fallback-2',
          title: 'Community Engagement Ready',
          description: 'Start reporting issues, sharing updates, and connecting with local champions in your area.',
          location: `${userLocation.lga}, ${userLocation.state}`,
          timeAgo: '1 minute ago',
          status: 'Ongoing',
          priority: 'medium',
          type: 'community_alert',
          source: 'YouthGovTrack'
        }
      ];
      setAllAlerts(fallbackAlerts);
      setAlerts(fallbackAlerts.slice(0, DISPLAY_COUNT));
    }
  }, [allAlerts.length, userLocation]);

  const getTypeIcon = (type: Alert['type']): string => {
    switch (type) {
      case 'community_alert':
        return '👥'; // Community
      case 'civic_alert':
        return '🚨'; // Urgent
      case 'report_status':
        return '📋'; // Report
      case 'champion_activity':
        return '🏆'; // Champion
      case 'system_notification':
        return '📢'; // System
      default:
        return '📢';
    }
  };

  const getTypeLabel = (type: Alert['type']): string => {
    switch (type) {
      case 'community_alert':
        return 'Community Alert';
      case 'civic_alert':
        return 'Civic Alert';
      case 'report_status':
        return 'Report Update';
      case 'champion_activity':
        return 'Champion Activity';
      case 'system_notification':
        return 'System Update';
      default:
        return 'Alert';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'Health':
        return 'bg-green-100 text-green-800';
      case 'Alert':
        return 'bg-red-100 text-red-800';
      case 'Resolved':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <h2 className="text-3xl font-bold text-gray-900">Live Civic Alerts</h2>
            <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full ml-3"></div>
          </div>
          <p className="text-gray-600">Stay updated with real-time community notifications and civic announcements</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>👥 Community Alerts</span>
            <span className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>🚨 Civic Alerts</span>
            <span className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>📋 Report Updates</span>
            <span className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>🏆 Champion Activities</span>
            <span className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>📢 System Updates</span>
          </div>
          {allAlerts.length > DISPLAY_COUNT && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-600">
              <div className="flex space-x-1">
                {Array.from({ length: Math.ceil(allAlerts.length / DISPLAY_COUNT) }).map((_, index) => {
                  const isActive = Math.floor(currentDisplayIndex / DISPLAY_COUNT) === index;
                  return (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-blue-600 w-6' : 'bg-blue-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div 
          className={`space-y-4 max-w-4xl mx-auto transition-all duration-500 ease-in-out transform ${
            transitionStage === 'fadeOut' 
              ? 'opacity-0 translate-y-4 scale-95' 
              : transitionStage === 'fadeIn'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {alerts.map((alert, index) => (
            <div
              key={`${alert.id}-${currentDisplayIndex}-${transitionStage}`}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                transitionStage === 'fadeOut' 
                  ? 'animate-fade-out' 
                  : 'animate-slide-in-up'
              }`}
              style={{ 
                animationDelay: `${index * 80}ms`,
                transitionDelay: `${index * 40}ms`
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="mr-2 animate-bounce-subtle">{getTypeIcon(alert.type)}</span>
                    <span className="mr-2 animate-pulse-subtle">{getPriorityIcon(alert.priority)}</span>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 transition-all duration-200 hover:scale-105">
                        {getTypeLabel(alert.type)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed">{alert.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center hover:text-blue-600 transition-colors duration-200">
                        📍 {alert.location}
                      </span>
                      <span className="flex items-center hover:text-green-600 transition-colors duration-200">
                        👤 {alert.source}
                      </span>
                    </div>
                    <span className="animate-fade-in">{alert.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allAlerts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-gray-400 text-6xl mb-4 animate-bounce">📢</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts at the moment</h3>
            <p className="text-gray-500">Check back later for community updates and civic announcements</p>
          </div>
        )}

      </div>

      {/* Popup Notifications for All Users */}
      {popupNotifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
          {popupNotifications.map((notification, index) => (
            <div
              key={`popup-${notification.id}`}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-slide-in transform transition-all duration-300 hover:shadow-xl"
              style={{ 
                animationDelay: `${index * 100}ms`,
                marginTop: index > 0 ? '12px' : '0'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getTypeIcon(notification.type)}</span>
                    <span className="mr-2">{getPriorityIcon(notification.priority)}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                        New Alert
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {notification.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      📍 {notification.location}
                    </span>
                    <span>{notification.timeAgo}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => removePopupNotification(notification.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close notification"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LiveCivicAlerts;
