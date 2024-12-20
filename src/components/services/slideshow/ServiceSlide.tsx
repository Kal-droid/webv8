import React from 'react';
import { motion } from 'framer-motion';
import { FinancialService } from '../../../types/services';
import Text from '../../common/Text';
import OptimizedImage from '../../common/OptimizedImage';

interface ServiceSlideProps {
  service: FinancialService;
  isActive: boolean;
}

export default function ServiceSlide({ service, isActive }: ServiceSlideProps) {
  const slideVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 }
  };

  return (
    <motion.div
      className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      variants={slideVariants}
      initial="enter"
      animate={isActive ? "center" : "exit"}
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Visual Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <OptimizedImage
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <Text variant="h3" className="text-primary mb-4">
            {service.title}
          </Text>
          <Text variant="body" className="text-gray-600 mb-6">
            {service.description}
          </Text>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <span className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}