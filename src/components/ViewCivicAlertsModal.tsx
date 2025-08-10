import React, { useState, useEffect } from 'react';

interface ViewCivicAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CivicAlert {
  id: number;
  title: string;
  type: 'emergency' | 'maintenance' | 'announcement' | 'warning';
  location: string;
  state: string;
  lga: string;
  description: string;
  timestamp: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
}

const ViewCivicAlertsModal: React.FC<ViewCivicAlertsModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [alerts, setAlerts] = useState<CivicAlert[]>([]);

  useEffect(() => {
    // Simulate loading alerts
    const mockAlerts: CivicAlert[] = [
      {
        id: 1,
        title: "Road Closure - Third Mainland Bridge",
        type: "emergency",
        location: "Third Mainland Bridge",
        state: "Lagos",
        lga: "Lagos Island",
        description: "Emergency repairs on Third Mainland Bridge. Expect traffic diversions. Alternative routes: Carter Bridge and Eko Bridge.",
        timestamp: "2 hours ago",
        isActive: true,
        priority: "urgent",
        source: "Lagos State Government"
      },
      {
        id: 2,
        title: "Water Supply Maintenance",
        type: "maintenance",
        location: "Ikeja GRA",
        state: "Lagos",
        lga: "Ikeja",
        description: "Scheduled water supply maintenance. Water supply will be interrupted from 6 AM to 2 PM today.",
        timestamp: "5 hours ago",
        isActive: true,
        priority: "medium",
        source: "Lagos Water Corporation"
      },
      {
        id: 3,
        title: "Public Health Advisory",
        type: "announcement",
        location: "FCT",
        state: "FCT",
        lga: "Abuja Municipal",
        description: "Free COVID-19 vaccination available at all primary healthcare centers. No appointment needed.",
        timestamp: "1 day ago",
        isActive: true,
        priority: "medium",
        source: "FCT Health Department"
      },
      {
        id: 4,
        title: "Security Alert - Increased Patrols",
        type: "warning",
        location: "Kano Central",
        state: "Kano",
        lga: "Kano Municipal",
        description: "Increased security patrols in market areas due to recent incidents. Citizens advised to report suspicious activities.",
        timestamp: "2 days ago",
        isActive: true,
        priority: "high",
        source: "Kano State Police"
      },
      {
        id: 5,
        title: "Power Outage Notification",
        type: "maintenance",
        location: "Port Harcourt Township",
        state: "Rivers",
        lga: "Port Harcourt",
        description: "Planned power outage for infrastructure upgrade. Affected areas: Mile 1, Mile 2, and Diobu. Duration: 8 AM - 4 PM.",
        timestamp: "3 days ago",
        isActive: false,
        priority: "medium",
        source: "Port Harcourt Electricity"
      },
      {
        id: 6,
        title: "Town Hall Meeting",
        type: "announcement",
        location: "Kaduna Central Mosque",
        state: "Kaduna",
        lga: "Kaduna North",
        description: "Community town hall meeting to discuss local development projects. All residents invited. Date: August 15, 2025, 10 AM.",
        timestamp: "1 week ago",
        isActive: true,
        priority: "low",
        source: "Kaduna North LGA"
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = selectedType === 'all' || alert.type === selectedType;
    const stateMatch = selectedState === 'all' || alert.state === selectedState;
    return typeMatch && stateMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'maintenance':
        return '🔧';
      case 'announcement':
        return '📢';
      case 'warning':
        return '⚠️';
      default:
        return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'announcement':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Civic Alerts & Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="emergency">Emergency</option>
                <option value="maintenance">Maintenance</option>
                <option value="announcement">Announcement</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="FCT">FCT</option>
                <option value="Kano">Kano</option>
                <option value="Rivers">Rivers</option>
                <option value="Kaduna">Kaduna</option>
              </select>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getTypeColor(alert.type)} ${!alert.isActive ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📍 {alert.location}, {alert.lga}, {alert.state}</span>
                        <span>🕒 {alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(alert.priority)}`} title={`${alert.priority} priority`}></div>
                    {!alert.isActive && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Expired
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{alert.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Source: {alert.source}</span>
                  <div className="space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Share</button>
                    <button className="text-green-600 hover:text-green-800">Follow Updates</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No alerts found matching your criteria.</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-600">{alerts.filter(a => a.type === 'emergency' && a.isActive).length}</p>
                <p className="text-sm text-gray-600">Active Emergency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{alerts.filter(a => a.type === 'maintenance' && a.isActive).length}</p>
                <p className="text-sm text-gray-600">Maintenance</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{alerts.filter(a => a.type === 'announcement' && a.isActive).length}</p>
                <p className="text-sm text-gray-600">Announcements</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{alerts.filter(a => a.type === 'warning' && a.isActive).length}</p>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
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
