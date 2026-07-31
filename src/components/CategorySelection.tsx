
import React from 'react';
import { Button } from "@/components/ui/button";
import { useOnboarding, CardCategory } from '@/context/OnboardingContext';
import { CreditCard, Plane, Gift, Banknote, Shield } from 'lucide-react';

const categories = [
  {
    id: 'travel',
    title: 'Travel',
    description: 'Earn miles, free airport lounge access, and travel insurance',
    icon: Plane,
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'Earn points on every purchase, redeem for exciting rewards',
    icon: Gift,
  },
  {
    id: 'cashback',
    title: 'Cashback',
    description: 'Get cash back on everyday purchases and bill payments',
    icon: Banknote,
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Manage business expenses with specialized features',
    icon: CreditCard,
  },
  {
    id: 'premium',
    title: 'Premium',
    description: 'Exclusive benefits and premium services for select customers',
    icon: Shield,
  },
];

const CategorySelection: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setCurrentStep } = useOnboarding();

  const handleCategorySelect = (category: CardCategory) => {
    setSelectedCategory(category);
  };

  const handleNext = () => {
    if (selectedCategory) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-center">Choose Your Card Category</h1>
      <p className="text-gray-600 mb-8 text-center">Select the type of credit card that best suits your needs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div role="button" tabIndex={0}
            key={category.id}
            className={`card-category ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category.id as CardCategory)}
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-full ${selectedCategory === category.id ? 'bg-bank-red text-white' : 'bg-gray-100'}`}>
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold ml-4">{category.title}</h3>
            </div>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <Button 
          onClick={handleNext} 
          disabled={!selectedCategory} 
          className="px-8 py-6 text-lg bg-bank-red hover:bg-bank-red/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CategorySelection;
