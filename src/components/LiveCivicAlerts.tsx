import React from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  status: 'Health' | 'Alert' | 'Resolved' | 'Ongoing';
  priority: 'high' | 'medium' | 'low';
}

const LiveCivicAlerts: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      title: 'New Healthcare Center Opening',
      description: 'The newly completed healthcare center in Ikeja will be officially opened next week.',
      location: 'Ikeja LGA, Lagos',
      timeAgo: '2 hours ago',
      status: 'Health',
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Road Construction Delay',
      description: 'The Surulere road rehabilitation project has been delayed due to weather conditions.',
      location: 'Surulere LGA, Lagos',
      timeAgo: '1 week ago',
      status: 'Alert',
      priority: 'high'
    },
    {
      id: '3',
      title: 'School Renovation Completed',
      description: 'The Alimosho public school renovation has been successfully completed ahead of schedule.',
      location: 'Alimosho LGA, Lagos',
      timeAgo: '1 day ago',
      status: 'Resolved',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Town Hall Meeting',
      description: 'Join the upcoming town hall meeting to discuss infrastructure development in your LGA.',
      location: 'Victoria Island, Lagos',
      timeAgo: '3 days ago',
      status: 'Ongoing',
      priority: 'medium'
    }
  ];

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Civic Alerts</h2>
          <p className="text-gray-600">Stay updated with the latest civic announcements and alerts</p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getPriorityIcon(alert.priority)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">📍 {alert.location}</span>
                    <span>{alert.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveCivicAlerts;
