import React, { useState, useEffect } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { Project } from '../services/mockApi';
import { nigeriaStates } from '../data/nigeriaData';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject } = useProjects();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    state: '',
    lga: '',
    budget: '',
    contractor: '',
    startDate: '',
    expectedCompletion: ''
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [videoPreviewUrls, setVideoPreviewUrls] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cleanup video URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      videoPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [videoPreviewUrls]);

  const categories = [
    'Infrastructure', 'Healthcare', 'Education', 'Transportation', 
    'Agriculture', 'Technology', 'Housing', 'Environment', 'Security'
  ];

  // Get LGAs for the selected state
  const getSelectedStateLGAs = () => {
    const selectedState = nigeriaStates.find(state => state.name === formData.state);
    return selectedState ? selectedState.lgas : [];
  };

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 5; // Limit to 5 images
    
    if (selectedImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedImages(prev => [...prev, ...validFiles]);
      
      // Create preview URLs
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Handle video file selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxVideos = 3; // Limit to 3 videos
    
    if (selectedVideos.length + files.length > maxVideos) {
      alert(`You can only upload up to ${maxVideos} videos`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('video/');
      const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB max for videos
      
      if (!isValidType) {
        alert(`${file.name} is not a valid video file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 100MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedVideos(prev => [...prev, ...validFiles]);
      
      // Create preview URLs for videos
      validFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        setVideoPreviewUrls(prev => [...prev, url]);
      });
    }
  };

  // Remove a video
  const removeVideo = (index: number) => {
    // Clean up object URLs to prevent memory leaks
    if (videoPreviewUrls[index]) {
      URL.revokeObjectURL(videoPreviewUrls[index]);
    }
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.lga.trim()) newErrors.lga = 'LGA is required';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.contractor.trim()) newErrors.contractor = 'Contractor is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.expectedCompletion) newErrors.expectedCompletion = 'Expected completion date is required';

    // Validate budget is a number
    if (formData.budget && isNaN(Number(formData.budget))) {
      newErrors.budget = 'Budget must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Use local PNG files for newly submitted projects
      const localImages = ["/citizen1.png", "/citizen2.png", "/citizen3.png", "/Education.png", "/Healthcare.png"];
      const imageUrls = selectedImages.map((_, index) => 
        localImages[index % localImages.length] // Cycle through available local images
      );

      // Create mock video URLs for demo purposes
      const videoUrls = selectedVideos.map((_, index) => 
        `/demo-video-${index + 1}.mp4` // Placeholder video URLs
      );

      const newProject: Project = {
        id: Date.now(), // Simple ID generation for mock
        name: formData.name,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        state: formData.state,
        lga: formData.lga,
        status: 'Planned',
        progress: 0,
        budget: Number(formData.budget),
        contractor: formData.contractor,
        startDate: formData.startDate,
        expectedCompletion: formData.expectedCompletion,
        actualCompletion: null,
        beneficiaries: 0,
        reports: [],
        images: imageUrls,
        videos: videoUrls,
        tags: [formData.category.toLowerCase(), formData.state.toLowerCase()],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addProject(newProject);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        location: '',
        state: '',
        lga: '',
        budget: '',
        contractor: '',
        startDate: '',
        expectedCompletion: ''
      });
      
      // Reset images
      setSelectedImages([]);
      setImagePreviewUrls([]);
      
      // Reset videos and clean up URLs
      videoPreviewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedVideos([]);
      setVideoPreviewUrls([]);
      
      // Close modal
      onClose();
      
      // Show success message (you could add a toast notification here)
      alert('Project submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Error submitting project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Clear LGA when state changes
      if (name === 'state') {
        return { ...prev, [name]: value, lga: '' };
      }
      return { ...prev, [name]: value };
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear LGA error when state changes
    if (name === 'state' && errors.lga) {
      setErrors(prev => ({ ...prev, lga: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Submit New Project</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
              disabled={loading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter project name"
                disabled={loading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the project"
                disabled={loading}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Location and State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter location"
                  disabled={loading}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                >
                  <option value="">Select a state</option>
                  {nigeriaStates.map(state => (
                    <option key={state.code} value={state.name}>{state.name}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            {/* LGA and Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Local Government Area *
                </label>
                <select
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lga ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading || !formData.state}
                >
                  <option value="">Select an LGA</option>
                  {getSelectedStateLGAs().map(lga => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
                {errors.lga && <p className="text-red-500 text-sm mt-1">{errors.lga}</p>}
                {!formData.state && (
                  <p className="text-gray-500 text-sm mt-1">Please select a state first</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (₦) *
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter budget amount"
                  disabled={loading}
                />
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              </div>
            </div>

            {/* Contractor and Start Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contractor *
                </label>
                <input
                  type="text"
                  name="contractor"
                  value={formData.contractor}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contractor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter contractor name"
                  disabled={loading}
                />
                {errors.contractor && <p className="text-red-500 text-sm mt-1">{errors.contractor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
            </div>

            {/* Expected Completion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Completion *
              </label>
              <input
                type="date"
                name="expectedCompletion"
                value={formData.expectedCompletion}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.expectedCompletion ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.expectedCompletion && <p className="text-red-500 text-sm mt-1">{errors.expectedCompletion}</p>}
            </div>

            {/* Project Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={loading}
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Images
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB each (max 5 images)</p>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={loading}
                        >
                          ×
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          {selectedImages[index]?.name.slice(0, 8)}...
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Project Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Videos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center">
                  <input
                    type="file"
                    id="videos"
                    multiple
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                    disabled={loading}
                  />
                  <label
                    htmlFor="videos"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Add Videos
                  </label>
                  <p className="text-xs text-gray-500 mt-1">MP4, AVI, MOV up to 100MB each (max 3 videos)</p>
                </div>

                {/* Video Previews */}
                {videoPreviewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videoPreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                          <video
                            src={url}
                            className="w-full h-32 object-cover"
                            controls
                          />
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={loading}
                          >
                            ×
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            <div className="flex items-center space-x-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 5v10l8-5-8-5z"/>
                              </svg>
                              <span>{selectedVideos[index]?.name.slice(0, 12)}...</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {(selectedVideos[index]?.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitProjectModal;
