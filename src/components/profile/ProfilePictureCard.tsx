import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { StudentInfo } from '../../services/api';
import { PhotographInfo } from '../../services/api';
import Base64ImageCard from '../ImageView';

interface ProfilePictureCardProps {
  studentInfo?: StudentInfo | null;
  photograph?: PhotographInfo | null;
  loading?: {
    photograph: boolean;
  };
  useBase64Card?: boolean;
}

const ProfilePictureCard: React.FC<ProfilePictureCardProps> = ({ 
  studentInfo, 
  photograph, 
  loading = { photograph: false },
  useBase64Card = false
}) => {
  const getBase64Data = () => {
    if (!photograph?.photoUrl) return { base64: '', format: 'jpeg' };
    
    // Extract base64 and format from data URL
    const match = photograph.photoUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      return { base64: match[2], format: match[1] };
    }

    return { base64: '', format: 'jpeg' }; // Default to jpeg if unable to extract data
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b flex justify-center items-center">
        <h2 className="text-base font-semibold text-teal-800">Profile Picture</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 flex justify-center items-center">
        <div className="w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg relative group">
          {loading.photograph ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : photograph?.photoUrl ? (
            useBase64Card ? (
              <Base64ImageCard 
                base64Data={getBase64Data().base64} 
                format={getBase64Data().format} 
              />
            ) : (
              <img 
                src={photograph.photoUrl}
                alt={studentInfo?.studentName || 'Student Photo'} 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                loading="lazy"
                decoding="async"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Photo
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureCard;
