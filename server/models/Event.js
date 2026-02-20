const mongoose = require('mongoose');

/**
 * Event Schema - Stores event details and registration form structure
 * This allows dynamic form generation and ensures all event metadata is persisted
 */
const eventSchema = new mongoose.Schema({
  // Event Basic Information
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    unique: true,
    trim: true,
    index: true
  },
  eventAbbreviation: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 6,
    index: true
  },
  eventType: {
    type: String,
    enum: ['technical', 'gaming', 'workshop', 'competition', 'cultural', 'other'],
    default: 'technical'
  },
  category: {
    type: String,
    enum: ['coding', 'robotics', 'gaming', 'design', 'hackathon', 'other'],
    required: true
  },

  // Event Description
  description: {
    type: String,
    trim: true
  },
  longDescription: {
    type: String,
    trim: true
  },
  rules: [{
    type: String
  }],
  prizes: [{
    position: String,
    amount: String,
    description: String
  }],

  // Event Schedule
  eventDate: {
    type: Date,
    required: true
  },
  eventEndDate: {
    type: Date
  },
  registrationStartDate: {
    type: Date,
    default: Date.now
  },
  registrationEndDate: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },

  // Team Configuration
  minTeamSize: {
    type: Number,
    default: 1,
    min: 1
  },
  maxTeamSize: {
    type: Number,
    default: 1,
    min: 1
  },
  teamSizeOptions: [{
    value: String,
    label: String
  }],

  // Pricing
  entryFee: {
    type: String,
    default: 'Free'
  },
  feeAmount: {
    type: Number,
    default: 0
  },
  earlyBirdDiscount: {
    enabled: Boolean,
    discountPercent: Number,
    deadlineDate: Date
  },

  // Registration Limits
  maxRegistrations: {
    type: Number,
    default: null // null = unlimited
  },
  currentRegistrations: {
    type: Number,
    default: 0
  },
  waitlistEnabled: {
    type: Boolean,
    default: false
  },

  // Registration Form Structure
  formFields: [{
    fieldName: {
      type: String,
      required: true
    },
    fieldLabel: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      enum: ['text', 'email', 'tel', 'number', 'textarea', 'select', 'radio', 'checkbox', 'file', 'date'],
      required: true
    },
    placeholder: String,
    options: [String], // For select, radio
    required: {
      type: Boolean,
      default: false
    },
    validation: {
      pattern: String,
      minLength: Number,
      maxLength: Number,
      min: Number,
      max: Number
    },
    section: {
      type: String,
      default: 'Additional Information'
    },
    order: {
      type: Number,
      default: 0
    }
  }],

  // Payment Configuration
  paymentRequired: {
    type: Boolean,
    default: false
  },
  paymentMethods: [{
    type: String,
    enum: ['online', 'offline', 'cash', 'upi', 'card', 'netbanking']
  }],
  upiId: String,
  qrCodeUrl: String,

  // Contact Information
  coordinators: [{
    name: String,
    email: String,
    phone: String,
    role: String
  }],
  whatsappGroupLink: String,

  // Media
  bannerImage: String,
  thumbnailImage: String,
  galleryImages: [String],

  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'registration-open', 'registration-closed', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },

  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  registrationCount: {
    type: Number,
    default: 0
  },

  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'events'
});

// Indexes for performance
eventSchema.index({ eventName: 1 });
eventSchema.index({ eventAbbreviation: 1 });
eventSchema.index({ status: 1, isActive: 1 });
eventSchema.index({ eventDate: 1 });
eventSchema.index({ registrationEndDate: 1 });

// Virtual for checking if registration is open
eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date();
  return (
    this.status === 'registration-open' &&
    this.isActive &&
    now >= this.registrationStartDate &&
    now <= this.registrationEndDate &&
    (this.maxRegistrations === null || this.currentRegistrations < this.maxRegistrations)
  );
});

// Method to increment registration count
eventSchema.methods.incrementRegistrations = async function() {
  this.registrationCount += 1;
  this.currentRegistrations += 1;
  await this.save();
};

// Method to check if event is full
eventSchema.methods.isFull = function() {
  if (this.maxRegistrations === null) return false;
  return this.currentRegistrations >= this.maxRegistrations;
};

// Pre-save middleware to auto-generate abbreviation
eventSchema.pre('save', function(next) {
  if (!this.eventAbbreviation && this.eventName) {
    // Generate abbreviation from event name (first letters of words)
    this.eventAbbreviation = this.eventName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 6);
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
