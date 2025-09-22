import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';

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

interface ViewCivicAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewCivicAlertsModal: React.FC<ViewCivicAlertsModalProps> = ({ isOpen, onClose }) => {
  const { notifications } = useNotifications();

  if (!isOpen) return null;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'civic_alert':
        return '🚨';
      case 'community_alert':
        return '🔧';
      case 'system_notification':
        return '📢';
      case 'project_update':
        return '🚦';
      case 'report_status':
        return '📋';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'high':
        return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🔔</span>
            <h2 className="text-xl font-semibold">Live Civic Alerts</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
              <p className="text-gray-600">
                All systems are running normally. Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(alert.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{alert.title}</h4>
                        <p className="mt-1">{alert.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm opacity-75">
                          <span>{formatTimestamp(alert.timestamp)}</span>
                          {alert.lga && (
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{alert.lga}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-white bg-opacity-50 rounded-full">
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Updates automatically every 5 minutes
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCivicAlertsModal;
