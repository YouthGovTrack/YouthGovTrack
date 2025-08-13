import React, { useState, useEffect } from 'react';
import OptimizedIcon from './OptimizedIcon';
import { useNotifications } from '../contexts/NotificationContext';

interface ViewCivicAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CivicAlert {
  id: string;
  title: string;
  type: 'emergency' | 'maintenance' | 'announcement' | 'warning' | 'community_alert';
  location: string;
  state: string;
  lga: string;
  description: string;
  timestamp: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  isRead: boolean;
}

const ViewCivicAlertsModal: React.FC<ViewCivicAlertsModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  // Convert notifications to civic alerts format
  const alerts: CivicAlert[] = notifications
    .filter(notification => notification.type === 'civic_alert' || notification.type === 'community_alert')
    .map(notification => ({
      id: notification.id,
      title: notification.title,
      type: notification.type === 'community_alert' ? 'announcement' : 'emergency', // Map community alerts to announcements
      location: `${notification.lga || 'Various Areas'}`,
      state: notification.state || 'Multiple States',
      lga: notification.lga || 'Multiple LGAs',
      description: notification.message,
      timestamp: formatTimeAgo(notification.timestamp),
      isActive: true,
      priority: notification.priority,
      source: notification.source,
      isRead: notification.isRead
    }));

  // Add sample alerts for demonstration
  useEffect(() => {
    const sampleAlerts = [
      {
        id: 'sample-1',
        title: "Water Supply Maintenance",
        type: "maintenance" as const,
        location: "Ikeja GRA",
        state: "Lagos",
        lga: "Ikeja",
        description: "Scheduled water supply maintenance. Water supply will be interrupted from 6 AM to 2 PM today.",
        timestamp: "5 hours ago",
        isActive: true,
        priority: "medium" as const,
        source: "Lagos Water Corporation",
        isRead: false
      },
      {
        id: 'sample-2',
        title: "Public Health Advisory",
        type: "announcement" as const,
        location: "FCT",
        state: "FCT",
        lga: "Abuja Municipal",
        description: "Free COVID-19 vaccination available at all primary healthcare centers. No appointment needed.",
        timestamp: "1 day ago",
        isActive: true,
        priority: "medium" as const,
        source: "FCT Health Department",
        isRead: false
      }
    ];
  }, []);

  function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  }

  const handleAlertClick = (alertId: string) => {
    markAsRead(alertId);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = selectedType === 'all' || alert.type === selectedType;
    const stateMatch = selectedState === 'all' || alert.state === selectedState;
    return typeMatch && stateMatch;
  });

  const getTypeIcon = (type: string) => {
    const iconSize = 20;
    const iconClass = "flex-shrink-0";
    switch (type) {
      case 'emergency':
        return <OptimizedIcon name="alertTriangle" size={iconSize} className={`${iconClass} text-red-600`} />;
      case 'maintenance':
        return <OptimizedIcon name="tool" size={iconSize} className={`${iconClass} text-blue-600`} />;
      case 'announcement':
        return <OptimizedIcon name="speaker" size={iconSize} className={`${iconClass} text-green-600`} />;
      case 'warning':
        return <OptimizedIcon name="alertCircle" size={iconSize} className={`${iconClass} text-yellow-600`} />;
      default:
        return <OptimizedIcon name="activity" size={iconSize} className={`${iconClass} text-gray-600`} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (priority) {
      case 'urgent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'maintenance':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'announcement':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm relative">
                <OptimizedIcon name="bell" size={24} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">Civic Alerts & Notifications</h2>
                <p className="text-blue-100 text-sm">
                  {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-white/80 hover:text-white hover:bg-white/20 px-3 py-1 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                aria-label="Close modal"
              >
                <OptimizedIcon name="x" size={20} />
              </button>
            </div>
          </div>
          <p className="text-blue-50 leading-relaxed text-base max-w-3xl">
            Stay informed about important updates, emergency alerts, maintenance schedules, and community reports from local champions and government agencies.
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
          {/* Filters */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <OptimizedIcon name="filter" size={16} className="text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">Filter Alerts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Types</option>
                  <option value="emergency">🚨 Emergency</option>
                  <option value="maintenance">🔧 Maintenance</option>
                  <option value="announcement">📢 Announcement</option>
                  <option value="warning">⚠️ Warning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All States</option>
                  <option value="Lagos">Lagos State</option>
                  <option value="FCT">Federal Capital Territory</option>
                  <option value="Kano">Kano State</option>
                  <option value="Rivers">Rivers State</option>
                  <option value="Kaduna">Kaduna State</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <OptimizedIcon name="alertTriangle" size={20} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{alerts.filter(a => a.type === 'emergency' && a.isActive).length}</p>
              <p className="text-sm text-red-700">Emergency</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <OptimizedIcon name="tool" size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{alerts.filter(a => a.type === 'maintenance' && a.isActive).length}</p>
              <p className="text-sm text-blue-700">Maintenance</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <OptimizedIcon name="speaker" size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{alerts.filter(a => a.type === 'announcement' && a.isActive).length}</p>
              <p className="text-sm text-green-700">Announcements</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <OptimizedIcon name="alertCircle" size={20} className="text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{alerts.filter(a => a.type === 'warning' && a.isActive).length}</p>
              <p className="text-sm text-yellow-700">Warnings</p>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border rounded-xl p-5 transition-all duration-200 cursor-pointer ${getTypeColor(alert.type)} ${!alert.isActive ? 'opacity-60' : ''} ${!alert.isRead ? 'ring-2 ring-blue-200 shadow-md' : ''}`}
                onClick={() => handleAlertClick(alert.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="mt-1">
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold truncate ${!alert.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {alert.title}
                        </h3>
                        <span className={getPriorityBadge(alert.priority)}>
                          {alert.priority.toUpperCase()}
                        </span>
                        {!alert.isRead && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <OptimizedIcon name="mapPin" size={14} />
                          <span>{alert.location}, {alert.lga}, {alert.state}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <OptimizedIcon name="clock" size={14} />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.isActive && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Expired
                      </span>
                    )}
                  </div>
                </div>

                <p className={`mb-4 leading-relaxed ${!alert.isRead ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                  {alert.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">Source: {alert.source}</span>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OptimizedIcon name="externalLink" size={14} />
                      <span>Share</span>
                    </button>
                    <button 
                      className="inline-flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OptimizedIcon name="bell" size={14} />
                      <span>Follow</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <OptimizedIcon name="bell" size={48} className="text-gray-300 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No alerts found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}

          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCivicAlertsModal;
