
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOnboarding } from '@/context/OnboardingContext';
import { toast } from "sonner";

const OpenBankingConsent: React.FC = () => {
  const { bankAccounts, toggleBankAccountSelection, setCurrentStep } = useOnboarding();
  const [step, setStep] = useState<'bank-selection' | 'account-selection' | 'consent' | 'login'>('bank-selection');
  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBankSelection = (bank: string) => {
    setSelectedBank(bank);
    setStep('account-selection');
  };

  const handleBack = () => {
    if (step === 'bank-selection') {
      setCurrentStep(2);
    } else if (step === 'account-selection') {
      setStep('bank-selection');
    } else if (step === 'consent') {
      setStep('account-selection');
    } else if (step === 'login') {
      setStep('consent');
    }
  };

  const handleContinue = () => {
    if (step === 'account-selection') {
      // Check if at least one account is selected
      if (!bankAccounts.some(account => account.selected)) {
        toast.error('Please select at least one account');
        return;
      }
      setStep('consent');
    } else if (step === 'consent') {
      setStep('login');
    } else if (step === 'login') {
      if (!username || !password) {
        toast.error('Please enter both username and password');
        return;
      }

      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep(4);
        toast.success('Open banking authentication successful!');
      }, 2000);
    }
  };

  const handleCancel = () => {
    setCurrentStep(2);
    toast("Open banking process cancelled", {
      description: "You can try again later"
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {step === 'bank-selection' && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-center">Select Your Bank</h1>
          <p className="text-gray-600 mb-8 text-center">
            Please select your bank for which you would like to share data
          </p>
          
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search Bank Name"
              className="py-6 px-4 w-full"
            />
          </div>
          
          <h2 className="font-semibold text-xl mb-4">Available Banks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'ADCB', logo: '/lovable-uploads/cfed4b12-413a-446f-9085-adcf9de91b60.png' },
              { name: 'Citibank UAE', logo: 'https://1000logos.net/wp-content/uploads/2016/11/Citi-Logo.png' },
              { name: 'Emirates NBD', logo: 'https://seeklogo.com/images/E/Emirates_NBD-logo-FCDE2441D2-seeklogo.com.png' },
              { name: 'Mashreq Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Mashreq_Bank_Logo.svg/2560px-Mashreq_Bank_Logo.svg.png' },
              { name: 'Rak Bank', logo: 'https://sillinks.com/storage/company/partners_images/4af08dd5d228c2eab744e018a8091c30.png' },
              { name: 'United Arab Bank', logo: 'https://www.uab.ae/wp-content/uploads/2022/12/UAB-Logo.png' },
            ].map((bank) => (
              <div role="button" tabIndex={0} aria-label={bank.name}
                key={bank.name}
                onClick={() => handleBankSelection(bank.name)}
                className="flex items-center justify-between p-6 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-bank-lightBlue transition-colors"
              >
                <div className="flex items-center">
                  <span
                    aria-hidden="true"
                    className="h-9 w-9 shrink-0 rounded-full bg-bank-red/10 text-bank-red flex items-center justify-center text-xs font-bold tracking-tight"
                  >
                    {bank.name.split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase()}
                  </span>
                  <span className="ml-4 font-medium">{bank.name}</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                  {selectedBank === bank.name && (
                    <div className="w-4 h-4 rounded-full bg-bank-red"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              onClick={handleBack}
              variant="outline" 
              className="px-6"
            >
              Back
            </Button>
          </div>
        </>
      )}
      
      {step === 'account-selection' && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-center">Select Accounts</h1>
          <p className="text-gray-600 mb-8 text-center">
            Please select your bank accounts for which you would like to share data
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {bankAccounts.map((account, index) => (
              <div role="button" tabIndex={0} 
                key={index} 
                className={`bg-white p-6 rounded-lg border-2 ${account.selected ? 'border-bank-red' : 'border-gray-200'}`}
                onClick={() => toggleBankAccountSelection(index)}
              >
                <h3 className="text-lg font-semibold mb-1">{account.type}</h3>
                <p className="text-gray-600">{account.number}</p>
                <div className="flex justify-end mt-4">
                  {account.selected ? (
                    <div className="w-6 h-6 rounded-md bg-bank-red flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-md border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              onClick={handleBack}
              variant="outline" 
              className="px-6"
            >
              Back
            </Button>
            <Button 
              type="button" 
              onClick={handleContinue}
              className="px-6 bg-bank-red hover:bg-bank-red/90"
            >
              Continue
            </Button>
          </div>
        </>
      )}
      
      {step === 'consent' && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-center">Consent Details</h1>
          <p className="text-gray-600 mb-8 text-center">
            Please review and confirm your consent for data sharing
          </p>
          
          <div className="bg-white rounded-lg p-6 mb-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="purpose">
                <AccordionTrigger className="text-lg font-semibold">
                  Purpose Statement: Credit Assessment
                </AccordionTrigger>
                <AccordionContent>
                  <p>Your bank statement data will be used to assess your credit eligibility for the card application.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-4">
              <div>
                <h3 className="font-semibold mb-2">Direct Benefit Statement</h3>
                <p className="text-gray-600">If approved, you will be granted a credit card with tailored offers</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Request Statement</h3>
                <p className="text-gray-600">Account Details, Account Balance & Transactions</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Duration Period Statement</h3>
              <p className="text-gray-600">28 Apr 2025</p>
            </div>
          </div>
          
          <div className="bg-bank-lightBlue p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Data Access</h3>
            <p className="text-gray-600 mb-4">To get the best credit card offers, your bank account statements will be fetched from your chosen accounts</p>
            
            <p className="text-gray-600 mb-2">We require one-time access to the following:</p>
            <ul className="list-disc ml-6 mb-4">
              <li className="mb-1">Your account details</li>
              <li className="mb-1">Your account transactions</li>
              <li className="mb-1">Your statements for last 6 months</li>
            </ul>
            
            <p className="text-gray-600">You can cancel data sharing anytime from the settings panel</p>
          </div>
          
          <p className="text-sm text-gray-500 mb-8">
            Securely redirect to {selectedBank} to authenticate and confirm this data sharing consent
          </p>
          
          <div className="flex flex-wrap justify-between gap-4">
            <Button 
              type="button" 
              onClick={handleCancel}
              variant="outline" 
              className="px-6 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Cancel
            </Button>
            <div className="flex gap-4">
              <Button 
                type="button" 
                onClick={handleBack}
                variant="outline" 
                className="px-6"
              >
                Back
              </Button>
              <Button 
                type="button" 
                onClick={handleContinue}
                className="px-6 bg-bank-blue hover:bg-bank-blue/90"
              >
                Redirect to {selectedBank}
              </Button>
            </div>
          </div>
        </>
      )}
      
      {step === 'login' && (
        <>
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <img src="/lovable-uploads/cfed4b12-413a-446f-9085-adcf9de91b60.png" alt="Bank Logo" className="h-12" />
            </div>
            
            <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-5"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-5"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5c-7.7 0-11 7-11 7s3.3 7 11 7 11-7 11-7-3.3-7-11-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>
                
                <a href="#" className="text-bank-red hover:underline text-sm">
                  Forgot Credentials?
                </a>
              </div>
              
              <div className="pt-4 flex flex-col gap-4">
                <Button 
                  type="button" 
                  onClick={handleContinue}
                  className="w-full py-6 bg-bank-red hover:bg-bank-red/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Login"}
                </Button>
                
                <Button 
                  type="button" 
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default OpenBankingConsent;
