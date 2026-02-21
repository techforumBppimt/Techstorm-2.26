import React from 'react';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';

/**
 * Reusable Registration Stepper Component
 * Wraps any registration form with a 3-step process:
 * 1. Participant/Team Details
 * 2. Payment Information
 * 3. Rules & Agreement
 */
const RegistrationStepper = ({
  step1Content,
  step2Content,
  step3Content,
  onStepValidation,
  onComplete,
  isSubmitting = false
}) => {
  const handleNextClick = (currentStep) => {
    if (onStepValidation) {
      return onStepValidation(currentStep);
    }
    return true;
  };

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => console.log('Current step:', step)}
      onFinalStepCompleted={onComplete}
      backButtonText="← Previous"
      nextButtonText="Next Step →"
      disableStepIndicators={false}
    >
      {/* Step 1: Participant/Team Details */}
      <Step>
        {step1Content}
      </Step>

      {/* Step 2: Payment Information */}
      <Step>
        {step2Content}
      </Step>

      {/* Step 3: Rules & Agreement */}
      <Step>
        {step3Content}
      </Step>
    </Stepper>
  );
};

export default RegistrationStepper;
