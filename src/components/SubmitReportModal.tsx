import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

interface SubmitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitReportModal: React.FC<SubmitReportModalProps> = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    priority: 'medium',
    images: null as FileList | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = currentUser.firstName && currentUser.lastName 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Anonymous Citizen';

    // Extract state and LGA from location
    const locationParts = formData.location.split(',').map(part => part.trim());
    const state = locationParts.length >= 2 ? locationParts[locationParts.length - 1] : 'Unknown State';
    const lga = locationParts.length >= 2 ? locationParts[locationParts.length - 2] : 'Unknown LGA';

    // Create notification for the report submission
    addNotification({
      type: 'community_alert',
      title: `New Report: ${formData.title}`,
      message: `${userName} submitted a report about ${formData.category.toLowerCase()} in ${formData.location}. ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}`,
      priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
      source: userName,
      state: state,
      lga: lga
    });

    // If it's urgent priority, create an additional civic alert
    if (formData.priority === 'urgent') {
      addNotification({
        type: 'civic_alert',
        title: `🚨 Urgent: ${formData.title}`,
        message: `URGENT REPORT: ${formData.description.substring(0, 150)}${formData.description.length > 150 ? '...' : ''} - Immediate attention required.`,
        priority: 'urgent',
        source: `Community Report via ${userName}`,
        state: state,
        lga: lga
      });
    }

    // Simulate champion verification notification (after 2-5 seconds)
    setTimeout(() => {
      const champions = [
        'Champion Sarah Abubakar',
        'Champion Emeka Okafor', 
        'Champion Adebayo Ogundimu',
        'Champion Fatima Hassan',
        'Champion John Okwu'
      ];
      const randomChampion = champions[Math.floor(Math.random() * champions.length)];
      
      addNotification({
        type: 'report_status',
        title: 'Report Under Review',
        message: `Your report "${formData.title}" is now under review by ${randomChampion}. You will be notified once verification is complete.`,
        priority: 'medium',
        source: randomChampion,
        state: state,
        lga: lga
      });
    }, Math.random() * 3000 + 2000); // 2-5 seconds delay

    // Simulate verification completion (after 10-20 seconds)
    setTimeout(() => {
      const champions = [
        'Champion Sarah Abubakar',
        'Champion Emeka Okafor', 
        'Champion Adebayo Ogundimu',
        'Champion Fatima Hassan',
        'Champion John Okwu'
      ];
      const randomChampion = champions[Math.floor(Math.random() * champions.length)];
      
      addNotification({
        type: 'report_status',
        title: 'Report Verified ✅',
        message: `Your report "${formData.title}" has been verified by ${randomChampion}. It will now be escalated to relevant authorities for action.`,
        priority: 'low',
        source: randomChampion,
        state: state,
        lga: lga
      });
    }, Math.random() * 10000 + 10000); // 10-20 seconds delay

    console.log('Report submitted:', formData);
    alert('Report submitted successfully! You will receive notifications about its progress.');
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      category: '',
      location: '',
      description: '',
      priority: 'medium',
      images: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      images: e.target.files
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Submit New Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief title for your report"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="environment">Environment</option>
                  <option value="security">Security</option>
                  <option value="corruption">Corruption</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <select
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Specific location (e.g., Street name, LGA, State)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide detailed description of the issue or concern"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Images (Optional)
              </label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                You can upload multiple images to support your report
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitReportModal;
