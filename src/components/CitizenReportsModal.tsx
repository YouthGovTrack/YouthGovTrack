import React, { useState } from 'react';

interface CitizenReport {
  id: string;
  projectId: string;
  projectTitle: string;
  reporterName: string;
  reporterEmail: string;
  reportType: 'progress_update' | 'issue' | 'completion' | 'abandonment' | 'quality_concern';
  description: string;
  images: string[];
  location: {
    state: string;
    lga: string;
    address?: string;
  };
  status: 'pending' | 'verified' | 'investigating' | 'resolved';
  submitDate: string;
  verifiedBy?: string;
  championNotes?: string;
}

interface CitizenReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  projectTitle?: string;
}

const CitizenReportsModal: React.FC<CitizenReportsModalProps> = ({ 
  isOpen, 
  onClose, 
  projectId, 
  projectTitle 
}) => {
  const [reportData, setReportData] = useState({
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    reportType: '',
    description: '',
    address: '',
    images: [] as File[],
    anonymous: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const reportTypes = [
    { value: 'progress_update', label: 'Progress Update', icon: '📈', desc: 'Share updates on project progress' },
    { value: 'issue', label: 'Report Issue', icon: '⚠️', desc: 'Report problems or concerns' },
    { value: 'completion', label: 'Project Completed', icon: '✅', desc: 'Confirm project completion' },
    { value: 'abandonment', label: 'Project Abandoned', icon: '🚫', desc: 'Report abandoned project' },
    { value: 'quality_concern', label: 'Quality Issues', icon: '🔍', desc: 'Report quality or safety concerns' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - reportData.images.length);
      setReportData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    setReportData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport: CitizenReport = {
        id: Date.now().toString(),
        projectId: projectId || '',
        projectTitle: projectTitle || '',
        reporterName: reportData.anonymous ? 'Anonymous' : reportData.reporterName,
        reporterEmail: reportData.reporterEmail,
        reportType: reportData.reportType as CitizenReport['reportType'],
        description: reportData.description,
        images: reportData.images.map(file => URL.createObjectURL(file)),
        location: {
          state: 'Lagos', // This would come from user data or be selectable
          lga: 'Ikeja',
          address: reportData.address
        },
        status: 'pending',
        submitDate: new Date().toISOString()
      };

      // Store report (in real app, this would be sent to backend)
      const existingReports = JSON.parse(localStorage.getItem('citizenReports') || '[]');
      localStorage.setItem('citizenReports', JSON.stringify([...existingReports, newReport]));

      alert('Report submitted successfully! Thank you for your contribution to the community.');
      onClose();
      
      // Reset form
      setReportData({
        reporterName: '',
        reporterEmail: '',
        reporterPhone: '',
        reportType: '',
        description: '',
        address: '',
        images: [],
        anonymous: false
      });
    } catch (error) {
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Submit Citizen Report</h2>
              {projectTitle && (
                <p className="text-gray-600 mt-1">For: {projectTitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-900">Your Voice Matters</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Your reports help ensure government projects serve the community effectively. 
                  All reports are reviewed by verified Community Champions.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Reporter Information</h3>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={reportData.anonymous}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <label className="text-sm text-gray-700">
                  Submit anonymously (your contact info will be kept private)
                </label>
              </div>

              {!reportData.anonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="reporterName"
                      value={reportData.reporterName}
                      onChange={handleInputChange}
                      required={!reportData.anonymous}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="reporterPhone"
                      value={reportData.reporterPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="reporterEmail"
                  value={reportData.reporterEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll use this to send you updates on your report
                </p>
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Report Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.map(type => (
                  <label
                    key={type.value}
                    className={`relative flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      reportData.reportType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={type.value}
                      checked={reportData.reportType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{type.icon}</span>
                        <span className="font-medium text-gray-900">{type.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Description *
              </label>
              <textarea
                name="description"
                value={reportData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide detailed information about what you observed. Include dates, times, and specific details that would help verify your report..."
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specific Location/Address
              </label>
              <input
                type="text"
                name="address"
                value={reportData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Specific address or landmark (optional)"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Supporting Images (Optional)
              </label>
              
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-600">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 5 files
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Previews */}
              {reportData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {reportData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
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

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CitizenReportsModal;
