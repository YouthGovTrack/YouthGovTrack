import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

interface SubmitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitReportModal: React.FC<SubmitReportModalProps> = ({ isOpen, onClose }) => {
  const { addNotification, addGlobalNotification } = useNotifications();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    priority: 'medium',
    images: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current user info from Auth context
    const userName = user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : 'Anonymous Citizen';

    // Extract state and LGA from location
    const locationParts = formData.location.split(',').map(part => part.trim());
    const state = locationParts.length >= 2 ? locationParts[locationParts.length - 1] : user?.state || 'Unknown State';
    const lga = locationParts.length >= 2 ? locationParts[locationParts.length - 2] : user?.lga || 'Unknown LGA';

    // Create new report object for instant display
    const newReport = {
      id: Date.now().toString(),
      projectId: '',
      projectTitle: formData.title,
      reporterName: userName,
      reporterEmail: user?.email || 'unknown@email.com',
      reportType: 'issue' as const,
      description: formData.description,
      images: formData.images.map(file => URL.createObjectURL(file)),
      location: {
        state: state,
        lga: lga,
        address: formData.location
      },
      status: 'verified' as const, // Instant verification
      submitDate: new Date().toISOString(),
      verifiedBy: 'Auto-verified',
      championNotes: `Report submitted via quick submit form. Category: ${formData.category}, Priority: ${formData.priority}`
    };

    // Save to localStorage for instant display on reports page
    const existingReports = JSON.parse(localStorage.getItem('citizenReports') || '[]');
    localStorage.setItem('citizenReports', JSON.stringify([newReport, ...existingReports]));

    // Trigger storage event for real-time updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'citizenReports',
      newValue: JSON.stringify([newReport, ...existingReports])
    }));

    // Create notification for the report submission (personal notification)
    addNotification({
      type: 'community_alert',
      title: `New Report: ${formData.title}`,
      message: `${userName} submitted a report about ${formData.category.toLowerCase()} in ${formData.location}. ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}`,
      priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
      source: userName,
      state: state,
      lga: lga
    });

    // Create global community notification for all users in the area
    addGlobalNotification({
      type: 'community_alert',
      title: `Community Report: ${formData.title}`,
      message: `A community member reported ${formData.category.toLowerCase()} concerns in ${formData.location}. Priority: ${formData.priority.toUpperCase()}`,
      priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
      source: `Community Report via ${userName}`,
      state: state,
      lga: lga,
      isGlobal: true,
      targetAudience: 'lga', // Share with all users in the same LGA
      category: formData.category
    });

    // If it's urgent priority, create an additional global civic alert
    if (formData.priority === 'urgent') {
      addGlobalNotification({
        type: 'civic_alert',
        title: `🚨 URGENT: ${formData.title}`,
        message: `URGENT COMMUNITY ALERT: ${formData.description.substring(0, 150)}${formData.description.length > 150 ? '...' : ''} - Immediate attention required in ${formData.location}.`,
        priority: 'urgent',
        source: `Emergency Report via ${userName}`,
        state: state,
        lga: lga,
        isGlobal: true,
        targetAudience: 'state', // Urgent alerts go to entire state
        category: formData.category
      });
    }

    console.log('Report submitted:', formData);
    alert('Report submitted successfully and is now visible on the reports page!');
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      category: '',
      location: '',
      description: '',
      priority: 'medium',
      images: []
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
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5)
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
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
                You can upload up to 5 images to support your report
              </p>
              
              {/* Image Previews */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
