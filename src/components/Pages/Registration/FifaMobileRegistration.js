import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import './Registration.css';
import fifaMobileBanner from '../../../assets/img/event_specific_pictures/games/fifa_mobile.png';

const FifaMobileRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    department: '',
    yearOfStudy: '',
    contactNumber: '',
    emailAddress: '',
    fifaUsername: '',
    teamOvr: '',
    deviceModel: '',
    agreeToRules: false,
    whatsappConfirmed: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College Name is required';
    if (!formData.department.trim()) nextErrors.department = 'Department / Branch is required';
    if (!formData.yearOfStudy.trim()) nextErrors.yearOfStudy = 'Year of Study is required';

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber = 'Contact Number is required';
    } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      nextErrors.contactNumber = 'Enter a valid contact number';
    }

    if (!formData.emailAddress.trim()) {
      nextErrors.emailAddress = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      nextErrors.emailAddress = 'Invalid email format';
    }

    if (!formData.fifaUsername.trim()) nextErrors.fifaUsername = 'FIFA Mobile Username is required';
    if (!formData.teamOvr.trim()) nextErrors.teamOvr = 'Team OVR is required';
    if (!formData.deviceModel.trim()) nextErrors.deviceModel = 'Device Model is required';
    if (!formData.agreeToRules) nextErrors.agreeToRules = 'You must agree to tournament rules';
    if (!formData.whatsappConfirmed) {
      nextErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('FIFA Mobile registration submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        history.push('/events');
      }, 2500);
    }, 1200);
  };

  return (
    <div className="registration-page">
      <Breadcrumb
        pageTitle="Register for FIFA Mobile"
        currentPage="Registration"
        bgImage={fifaMobileBanner}
      />

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-header">
            <h1 className="registration-title">FIFA Mobile Registration Form</h1>
            <p className="registration-subtitle">Registration Information Required from Participants</p>
          </div>

          {submitSuccess && (
            <div className="success-message">
              Registration Successful! Redirecting to events page...
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; Participant Details</h2>

              <div className="form-group">
                <label className="form-label required">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Full Name"
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="College Name"
                />
                {errors.collegeName && <div className="error-message">{errors.collegeName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Department / Branch</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Department / Branch"
                />
                {errors.department && <div className="error-message">{errors.department}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Year of Study"
                />
                {errors.yearOfStudy && <div className="error-message">{errors.yearOfStudy}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Contact Number"
                />
                {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Email Address</label>
                <input
                  type="text"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Email Address"
                />
                {errors.emailAddress && <div className="error-message">{errors.emailAddress}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">FIFA Mobile Username (In-game Name)</label>
                <input
                  type="text"
                  name="fifaUsername"
                  value={formData.fifaUsername}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="FIFA Mobile Username"
                />
                {errors.fifaUsername && <div className="error-message">{errors.fifaUsername}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Team OVR (Overall Rating)</label>
                <input
                  type="text"
                  name="teamOvr"
                  value={formData.teamOvr}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Team OVR"
                />
                {errors.teamOvr && <div className="error-message">{errors.teamOvr}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Device Model</label>
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleInputChange}
                  className="retro-input"
                  placeholder="Device Model"
                />
                {errors.deviceModel && <div className="error-message">{errors.deviceModel}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Agreement to Tournament Rules</label>
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="agreeToRules"
                    checked={formData.agreeToRules}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to the FIFA Mobile tournament rules
                  </span>
                </label>
                {errors.agreeToRules && <div className="error-message">{errors.agreeToRules}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">&gt;&gt;&gt; WhatsApp Group</h2>
              <div className="form-group">
                <label className="form-label">Link</label>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://chat.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffc010' }}
                  >
                    https://chat.whatsapp.com/
                  </a>
                </p>
              </div>

              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="whatsappConfirmed"
                    checked={formData.whatsappConfirmed}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    Yes, I have Done
                  </span>
                </label>
                {errors.whatsappConfirmed && <div className="error-message">{errors.whatsappConfirmed}</div>}
              </div>
            </div>

            <div className="submit-button-wrapper">
              <button type="submit" className="retro-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              <button
                type="button"
                className="retro-button secondary"
                onClick={() => history.goBack()}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FifaMobileRegistration;
