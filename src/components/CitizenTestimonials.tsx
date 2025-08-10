import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  message: string;
  image: string;
}

const CitizenTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Adebayo Johnson',
      role: 'Community Advocate',
      location: 'Lagos State',
      message: "YouthGovTrack has empowered our community to hold local officials accountable. We've seen real change in how projects are reported and tracked in our LGA.",
      image: '/citizen1.png'
    },
    {
      id: 2,
      name: 'Amina Ibrahim',
      role: 'Student Leader',
      location: 'Kano State',
      message: "As young Nigerians, we now have a voice in governance. The platform has helped us report abandoned projects and see active follow-up from officials.",
      image: '/citizen2.png'
    },
    {
      id: 3,
      name: 'Emmanuel Okechukwu',
      role: 'Civil Society Activist',
      location: 'Enugu State',
      message: "This app revolutionized how we track public infrastructure projects. We can see real-time progress and hold our government accountable more effectively.",
      image: '/citizen3.png'
    },
    {
      id: 4,
      name: 'Fatima Bello',
      role: 'Youth Coordinator',
      location: 'Kaduna State',
      message: "YouthGovTrack helped us monitor school renovation projects. The transparency has improved and our children now study in properly equipped schools.",
      image: '/citizen1.png'
    }
  ];

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kind Words from Active Citizens
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from Nigerians making a difference in their communities using YouthGovTrack
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Container */}
          <div className="overflow-hidden rounded-xl bg-gray-50 shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-lg border-4 border-white"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/128x128/4F46E5/FFFFFF?text=${encodeURIComponent(testimonial.name.split(' ').map(word => word[0]).join(''))}`;
                        }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="mb-4">
                        <svg className="w-8 h-8 text-blue-600 mx-auto md:mx-0 mb-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      
                      <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium italic">
                        "{testimonial.message}"
                      </blockquote>
                      
                      <div className="border-l-4 border-blue-600 pl-4 inline-block">
                        <div className="font-bold text-lg text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-blue-600 font-medium text-sm">
                          {testimonial.role}
                        </div>
                        <div className="text-gray-500 text-sm">
                          📍 {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitizenTestimonials;
