import React from 'react';

interface AnnotationCardProps {
  id: string;
  title: string;
  status: string;
  feedback: string[];
  description: string;
  dependencies: string[];
  acceptanceCriteria: string | string[];
  userStory: string;
}

const AnnotationCard: React.FC<AnnotationCardProps> = () => {
  return null;
};

export default AnnotationCard;
