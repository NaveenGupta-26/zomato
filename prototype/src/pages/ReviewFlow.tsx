import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockBookings, activitiesData, Review } from '../data';
import { X, Star, Camera, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function ReviewFlow() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const booking = mockBookings.find((b) => b.id === bookingId);
  const activity = booking ?
  activitiesData.find((a) => a.id === booking.activityId) :
  null;
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  if (!activity || !booking) return <div>Booking not found</div>;
  const ratingLabels: Record<number, string> = {
    1: 'Disappointing',
    2: 'Could be better',
    3: 'Decent',
    4: 'Great',
    5: 'Excellent'
  };
  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleAddPhoto = () => {
    if (photos.length < 3) {
      // Mock adding a photo
      setPhotos([
      ...photos,
      `https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=300&q=80&random=${Math.random()}`]
      );
    }
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      const newReview: Review = {
        id: `r_${Date.now()}`,
        author: 'You',
        rating,
        text,
        photos,
        date: 'Just now',
        verified: true
      };
      // Save to localStorage to persist in prototype
      const existingStr = localStorage.getItem(`reviews_${activity.id}`);
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(
        `reviews_${activity.id}`,
        JSON.stringify([newReview, ...existing])
      );
      // Mark booking as reviewed
      booking.reviewed = true;
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/activity/${activity.id}`);
      }, 2000);
    }, 1500);
  };
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          className="w-20 h-20 bg-district-green rounded-full flex items-center justify-center mb-6">
          
          <CheckCircle2 size={40} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Review Submitted!
        </h2>
        <p className="text-gray-400 text-center">
          Thank you for sharing your experience. It helps other families make
          better decisions.
        </p>
      </div>);

  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="pt-6 pb-4 px-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) =>
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-district-purple' : i < step ? 'w-2 bg-district-purple/50' : 'w-2 bg-gray-800'}`} />

          )}
        </div>
        <button onClick={() => navigate(-1)} className="p-2 -mr-2">
          <X size={24} className="text-gray-400" />
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src={activity.image}
            alt=""
            className="w-12 h-12 rounded-xl object-cover" />
          
          <div>
            <h2 className="font-bold text-white">{activity.name}</h2>
            <p className="text-xs text-gray-400">Visited {booking.date}</p>
          </div>
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" custom={1}>
            {step === 1 &&
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3
              }}
              className="flex flex-col items-center pt-10">
              
                <h1 className="text-2xl font-bold text-white mb-10 text-center">
                  How was your experience?
                </h1>
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) =>
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-2 transition-transform active:scale-90">
                  
                      <Star
                    size={48}
                    className={
                    star <= rating ?
                    'text-yellow-400 fill-yellow-400' :
                    'text-gray-700'
                    } />
                  
                    </button>
                )}
                </div>
                <div className="h-6">
                  {rating > 0 &&
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="text-district-purple font-semibold text-lg">
                  
                      {ratingLabels[rating]}
                    </motion.span>
                }
                </div>
              </motion.div>
            }

            {step === 2 &&
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3
              }}>
              
                <h1 className="text-2xl font-bold text-white mb-2">
                  Tell us more
                </h1>
                <p className="text-gray-400 text-sm mb-6">
                  Your detailed feedback helps others.
                </p>

                <div className="relative">
                  <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 500))}
                  placeholder="What did you like? What could be better? (Optional)"
                  className="w-full bg-[#1c1c1e] border border-gray-800 rounded-2xl p-4 text-white placeholder-gray-600 h-48 resize-none focus:outline-none focus:border-district-purple transition-colors" />
                
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    {text.length}/500
                  </div>
                </div>
              </motion.div>
            }

            {step === 3 &&
            <motion.div
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3
              }}>
              
                <h1 className="text-2xl font-bold text-white mb-2">
                  Add photos
                </h1>
                <p className="text-gray-400 text-sm mb-6">
                  Show others what to expect. (Optional, max 3)
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, idx) =>
                <div
                  key={idx}
                  className="aspect-square rounded-2xl overflow-hidden relative group">
                  
                      <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover" />
                  
                      <button
                    onClick={() =>
                    setPhotos(photos.filter((_, i) => i !== idx))
                    }
                    className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                    
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                )}
                  {photos.length < 3 &&
                <button
                  onClick={handleAddPhoto}
                  className="aspect-square rounded-2xl border-2 border-dashed border-gray-700 bg-[#1c1c1e] flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-district-purple hover:text-district-purple transition-colors">
                  
                      <Camera size={24} />
                      <span className="text-xs font-medium">Add Photo</span>
                    </button>
                }
                </div>
              </motion.div>
            }

            {step === 4 &&
            <motion.div
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3
              }}>
              
                <h1 className="text-2xl font-bold text-white mb-6">
                  Preview your review
                </h1>

                <div className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-5 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">
                        Y
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          You
                        </div>
                        <div className="text-xs text-gray-500">
                          Visited {booking.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) =>
                    <Star
                      key={i}
                      size={14}
                      className={
                      i < rating ?
                      'text-yellow-400 fill-yellow-400' :
                      'text-gray-700 fill-gray-700'
                      } />

                    )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-district-green mb-3">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-semibold uppercase">
                      Verified District Booking
                    </span>
                  </div>

                  {text &&
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {text}
                    </p>
                }

                  {photos.length > 0 &&
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                      {photos.map((photo, idx) =>
                  <img
                    key={idx}
                    src={photo}
                    alt=""
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />

                  )}
                    </div>
                }
                </div>

                <p className="text-xs text-gray-500 text-center px-4">
                  Your review will be published after a brief quality check,
                  typically within 24 hours.
                </p>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto p-4 bg-[#0a0a0a] border-t border-gray-800 flex gap-3">
        {step > 1 &&
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl font-bold text-white bg-[#1c1c1e]">
          
            Back
          </button>
        }

        {step < 4 ?
        <button
          onClick={handleNext}
          disabled={step === 1 && rating === 0}
          className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-district-purple disabled:opacity-50 disabled:bg-gray-800 transition-colors">
          
            {step === 1 ? 'Next' : 'Skip & Next'}
          </button> :

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-district-purple flex justify-center items-center">
          
            {isSubmitting ?
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

          'Submit Review'
          }
          </button>
        }
      </div>
    </div>);

}