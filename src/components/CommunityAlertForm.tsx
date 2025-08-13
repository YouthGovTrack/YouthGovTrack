import React, { useState, useMemo } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { nigeriaStates } from '../data/nigeriaData';
import OptimizedIcon from './OptimizedIcon';
import AuthModal from './AuthModal';

interface CommunityAlertFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityAlertForm: React.FC<CommunityAlertFormProps> = ({ isOpen, onClose }) => {
  const { addNotification, addGlobalNotification } = useNotifications();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pendingSubmission, setPendingSubmission] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    state: '',
    lga: '',
    source: ''
  });

  // Initialize form with saved location data when modal opens
  React.useEffect(() => {
    if (isOpen) {
      const savedLocation = localStorage.getItem('selectedLocation');
      if (savedLocation) {
        const locationData = JSON.parse(savedLocation);
        setFormData(prev => ({
          ...prev,
          state: locationData.state || '',
          lga: locationData.lga || ''
        }));
      }
    }
  }, [isOpen]);

  // Check for user login after auth modal closes and attempt auto-submission
  React.useEffect(() => {
    if (pendingSubmission && !showAuthModal) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        // User has logged in, now submit the form automatically
        if (formData.title.trim() && formData.message.trim()) {
          handleActualSubmit();
        } else {
          alert('Please fill in all required fields before submitting');
        }
      }
      setPendingSubmission(false);
    }
  }, [showAuthModal, pendingSubmission, formData.title, formData.message]);

  // Get LGAs for the selected state
  const selectedStateLGAs = useMemo(() => {
    const selectedState = nigeriaStates.find(state => state.name === formData.state);
    return selectedState ? selectedState.lgas : [];
  }, [formData.state]);

  const handleActualSubmit = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    // Get current user info
    const userData = JSON.parse(currentUser);
    const userName = userData.name || formData.source || 'Community Member';

    // Add the notification to the bell icon (personal)
    addNotification({
      type: 'community_alert',
      title: formData.title,
      message: formData.message,
      priority: formData.priority,
      source: userName,
      state: formData.state,
      lga: formData.lga
    });

    // Add global community notification for all users in the area
    addGlobalNotification({
      type: 'community_alert',
      title: `Community Alert: ${formData.title}`,
      message: `${formData.message} - Reported by ${userName}`,
      priority: formData.priority,
      source: userName,
      state: formData.state,
      lga: formData.lga,
      isGlobal: true,
      targetAudience: formData.priority === 'urgent' ? 'state' : 'lga' // Urgent alerts go to entire state
    });

    // Reset form and close
    setFormData({
      title: '',
      message: '',
      priority: 'medium',
      state: '',
      lga: '',
      source: ''
    });
    onClose();
    
    // Show success message with bell icon reference
    setTimeout(() => {
      alert('🎉 Community alert submitted successfully!\n\n🔔 Check the bell icon in the navigation bar to see your alert.');
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Mark that we want to submit after login
      setPendingSubmission(true);
      // Show the auth modal instead of just an alert
      setShowAuthModal(true);
      return;
    }

    // User is logged in, submit immediately
    handleActualSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset LGA when state changes
      ...(name === 'state' && { lga: '' })
    }));
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
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <OptimizedIcon name="plus" size={24} />
            </div>
            <h2 className="text-2xl font-bold">Submit Community Alert</h2>
          </div>
          <p className="text-green-50">
            Report important information or issues in your community to help keep everyone informed.
          </p>
          {!localStorage.getItem('currentUser') && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-300/30 rounded-lg">
              <p className="text-yellow-100 text-sm flex items-center">
                <OptimizedIcon name="alertTriangle" size={16} className="mr-2" />
                You must be logged in to submit community alerts
              </p>
            </div>
          )}
        </div>

        {/* Scrollable Form Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Road closure on Main Street"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Provide detailed information about the alert..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🟠 High Priority</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name/Organization
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="e.g., Community Champion John"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select State</option>
                {nigeriaStates.map((state) => (
                  <option key={state.code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Government Area
              </label>
              <select
                name="lga"
                value={formData.lga}
                onChange={handleInputChange}
                disabled={!formData.state}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.state ? 'Select State First' : 'Select LGA'}
                </option>
                {selectedStateLGAs.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 pb-2 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg transition-all duration-200 font-medium inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
            >
              <OptimizedIcon name="send" size={18} />
              <span>Submit Alert</span>
            </button>
          </div>
        </form>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            setPendingSubmission(false); // Reset pending submission if user cancels
          }}
          onSuccess={() => {
            setShowAuthModal(false);
            // Don't reset pendingSubmission here - let the useEffect handle it
          }}
        />
      )}
    </div>
  );
};

export default CommunityAlertForm;
