import React, { useState, useRef } from 'react';
import { Camera, Check } from 'lucide-react';


const avatarCategories = {
  avataaars: {
    name: 'Avataaars',
    icon: '👤',
    description: 'Colorful cartoon-style avatars',
    avatars: [
      { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', name: 'Happy Felix' },
      { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper', name: 'Cool Jasper' },
      { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna', name: 'Cheerful Luna' },
    ]
  },
  bigSmile: {
    name: 'Big Smile',
    icon: '😊',
    description: 'Always happy and smiling',
    avatars: [
      { url: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Happy', name: 'Joyful Happy' },
      { url: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Sparkle', name: 'Radiant Sparkle' },
      { url: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Glow', name: 'Golden Glow' },
    ]
  }
};

export default function AvatarChanger() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<'avataaars' | 'bigSmile'>('avataaars');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = (url: string) => {
    setPreviewUrl(null);
    setSelectedAvatar(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedAvatar(null);
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    alert('Avatar changed successfully!');
    // Here you could trigger backend update if needed.
  };

  const currentAvatar = previewUrl || selectedAvatar;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      {/* Avatar Preview */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
          {currentAvatar ? (
            <img src={currentAvatar} alt="Current Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Avatar
            </div>
          )}
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Camera className="w-4 h-4" />
          <span>Upload Custom Image</span>
        </button>
        <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
      </div>

      {/* Category Switcher */}
      <div className="flex gap-4 justify-center">
        {Object.entries(avatarCategories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setCategory(key as 'avataaars' | 'bigSmile')}
            className={`px-4 py-2 rounded-full text-sm ${
              category === key ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            <span className="mr-2">{value.icon}</span>
            {value.name}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-4">
        {avatarCategories[category].avatars.map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleAvatarClick(avatar.url)}
            className={`border rounded-lg overflow-hidden transform transition hover:scale-105 ${
              selectedAvatar === avatar.url ? 'ring-4 ring-purple-400' : 'border-gray-300'
            }`}
          >
            <img src={avatar.url} alt={avatar.name} className="w-full h-auto" />
          </button>
        ))}
      </div>

      {/* Apply Button */}
      {currentAvatar && (
        <div className="flex justify-center">
          <button
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
          >
            <Check className="w-5 h-5" />
            <span>Apply Avatar</span>
          </button>
        </div>
      )}
    </div>
  );
}
