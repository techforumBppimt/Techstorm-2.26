# Event Registration Forms - Complete Field Mapping

## Overview
This document maps ALL fields used across **13 event registration forms** (excluding Code-Bee and HackStorm which use Devfolio) to ensure complete data persistence in MongoDB.

## The 13 Events with Custom Registration Forms

1. **Creative Canvas** - Design Competition (1-2 participants)
2. **Technomania** - Technical Quiz (1-4 participants)
3. **FIFA Mobile** - Gaming (Individual)
4. **Forza Horizon** - Gaming (Individual)
5. **Khet** - Board Game (1-2 participants)
6. **Omegatrix** - Puzzle Event (1-2 participants)
7. **Passion With Reels** - Video Competition (1-2 participants)
8. **Ro-Combat** - Robotics (2-4 participants)
9. **Ro-Navigator** - Robotics (2-4 participants)
10. **Ro-Soccer** - Robotics (2-5 participants)
11. **Ro-Sumo** - Robotics (2-5 participants)
12. **Ro-Terrance** - Robotics (2-5 participants)
13. **Tech Hunt** - Treasure Hunt (3-5 participants)

## Registration Form Types

### 1. **RegistrationForm.js** (Generic Template)
❌ **NOT USED** - Code-Bee and HackStorm use Devfolio external platform

### 2. **CreativeCanvas Registration.js** ✅
**Unique Structure:**
- `teamName` - string *
- `numberOfParticipants` - number (1-2) *
- `participants` - array of objects:
  - `name` - string *
  - `contact` - string * 
  - `email` - string (email) *
  - `college` - radio (BP PODDAR, OTHERS) *
  - `year` - radio (1st, 2nd, 3rd, 4th)
  - `idFile` - file *
- `paymentMode` - radio (cash, online) *
- `transactionId` - string (if online)
- `paymentReceipt` - file (if online)
- `cashReceipt` - file (if cash)
- `whatsappConfirmed` - checkbox *
- `agreeToRules` - checkbox *

### 3. **TechnomaniaRegistration.js**
**Structure:**
- `teamName` - string *
- `numberOfParticipants` - select (1-4) *
- `participants` - array (up to 4):
  - `name` - string * (first participant)
  - `contact` - string * (first participant)
  - `email` - string * (first participant)
  - `college` - string * (first participant)
  - `year` - radio (1st, 2nd, 3rd, 4rth) * (all)
  - `idFile` - file * (first participant)
- `paymentMode` - radio (cash, online) *
- `paymentDate` - date *
- `transactionId` - string (if online)
- `paymentScreenshot` - file (if online)
- `cashReceipt` - file (if cash)
- `agreeToRules` - checkbox *
- `whatsappConfirmed` - checkbox *

### 4. **RoSoccerRegistration.js** (& similar robotics events)
**Structure:**
- `teamName` - string *
- `numberOfParticipants` - select (2-5) *
- `participants` - array (2-5):
  - `name` - string * (first 2)
  - `contact` - string * (first 2)
  - `email` - string * (first 2)
  - `college` - string * (first 2)
  - `year` - radio (1st-4th Year) * (first 2)
  - `idFile` - file * (first 2)
- `paymentMode` - radio (cash, online) *
- `paymentDate` - date *
- `transactionId` - string (if online)
- `paymentScreenshot` - file (if online)
- `cashReceipt` - file (if cash)
- `agreeToRules` - checkbox *
- `whatsappConfirmed` - checkbox *

### 5. **FifaMobileRegistration.js** (Gaming - Individual)
**Unique Fields:**
- `fullName` - string *
- `collegeName` - string *
- `department` - string *
- `yearOfStudy` - string *
- `contactNumber` - string (tel) *
- `emailAddress` - string (email) *
- `fifaUsername` - string * (game-specific)
- `teamOvr` - string * (game-specific)
- `deviceModel` - string * (game-specific)
- `paymentMode` - radio (online, offline) *
- `paymentDate` - date *
- `transactionId` - string (if online)
- `paymentReceipt` - file *
- `agreeToRules` - checkbox *
- `whatsappConfirmed` - checkbox *

### 6. **HackStormRegistration.js** (Uses RegistrationForm Template)
**Custom Fields:**
- All fields from RegistrationForm.js PLUS:
- `customField1`: Project Idea/Theme - textarea *
- `customField2`: Technical Stack Expertise - text *
- `customField3`: GitHub Profile URL - text
- `customField4`: Previous Hackathon Experience - select *

## Complete Field List for MongoDB Schema

### Personal Information
- `fullName` / `full_name`
- `email` / `emailAddress`
- `phone` / `contactNumber` / `contact`
- `alternatePhone`
- `college` / `collegeName`
- `year` / `yearOfStudy`
- `department`
- `rollNumber`
- `studentId`

### Team Information
- `teamName`
- `teamSize`
- `numberOfParticipants`
- `isTeamLeader`
- `teamLeaderName`
- `teamLeaderEmail`
- `teamLeaderPhone`

### Team Members (Flat Structure for RegistrationForm.js)
- `teamMember2Name`
- `teamMember2Email`
- `teamMember2Phone`
- `teamMember3Name`
- `teamMember3Email`
- `teamMember3Phone`
- `teamMember4Name`
- `teamMember4Email`
- `teamMember4Phone`

### Participants Array (for Creative Canvas, Technomania, RoSoccer, etc.)
```javascript
participants: [{
  name: String,
  contact: String,
  email: String,
  college: String,
  year: String,
  department: String,
  idFile: String,
  idFileUrl: String,
  idFileCloudinaryId: String,
  role: String,
  order: Number
}]
```

### Payment Information
- `paymentMode` / `paymentMethod`
- `paymentDate`
- `transactionId`
- `paymentAmount`
- `paymentCurrency`
- `paymentReceipt`
- `paymentReceiptUrl`
- `paymentReceiptCloudinaryId`
- `paymentScreenshot`
- `paymentScreenshotUrl`
- `paymentScreenshotCloudinaryId`
- `cashReceipt`
- `cashReceiptUrl`
- `cashReceiptCloudinaryId`
- `paymentStatus` (pending, verified, failed, refunded, not-required)
- `paymentVerifiedBy`
- `paymentVerifiedAt`

### Event Specific Fields
- `experienceLevel` (beginner, intermediate, advanced, expert)
- `skillLevel`
- `dietaryRestrictions`
- `specialRequirements`
- `accessibility`
- `howDidYouHear` (social-media, friend, college, website, poster, email, other)
- `previousParticipation`
- `expectations`
- `additionalComments`

### Game-Specific Fields (FIFA Mobile, etc.)
- `fifaUsername` / `gameUsername`
- `teamOvr` / `playerRating`
- `deviceModel`

### Hackathon-Specific Fields
- `projectIdea` / `projectTheme`
- `technicalStack`
- `githubProfile`
- `previousHackathonExperience`

### File Uploads
- `idProof` / `idFile`
- `idProofUrl`
- `idProofCloudinaryId`
- `resume`
- `resumeUrl`
- `resumeCloudinaryId`
- `portfolio`
- `portfolioUrl`

### Confirmations & Agreements
- `whatsappConfirmed`
- `agreeToTerms`
- `agreeToRules`
- `agreeToCodeOfConduct`
- `consentToPhotography`
- `consentToDataProcessing`

### Registration Status & Workflow
- `registrationStatus` (pending, confirmed, cancelled, waitlist, rejected, checked-in)
- `registrationNumber` (auto-generated)
- `qrCode`

### Attendance & Check-In
- `checkedIn`
- `checkInTime`
- `checkInBy`
- `attended`
- `attendanceMarkedAt`

### Communication
- `emailConfirmationSent`
- `emailConfirmationSentAt`
- `reminderEmailSent`
- `reminderEmailSentAt`
- `smsNotificationSent`
- `whatsappNotificationSent`

### Admin Notes & Review
- `adminNotes`
- `internalComments` - array
- `reviewedBy`
- `reviewedAt`
- `approvedBy`
- `approvedAt`

### Metadata
- `eventName` *
- `eventId`
- `submittedAt`
- `updatedAt`
- `submittedFrom` (ipAddress, userAgent, device, browser, os)
- `source` (web, mobile, admin, import)

### Score & Results (for Competitions)
- `score`
- `rank`
- `result`
- `certificateIssued`
- `certificateUrl`
- `certificateIssuedAt`

### Tags & Categorization
- `tags` - array
- `category`
- `priority` (low, normal, high)

### Custom/Dynamic Fields (for event-specific questions)
- `customField1` through `customField10` - Mixed
- `formResponses` - array of {fieldName, fieldLabel, fieldType, value, order}

## Field Name Variations to Handle
The schema must handle multiple naming conventions:
- `fullName` vs `full_name`
- `email` vs `emailAddress`
- `phone` vs `contactNumber` vs `contact`
- `college` vs `collegeName`
- `year` vs `yearOfStudy`
- `paymentMode` vs `paymentMethod`
- `idProof` vs `idFile`

## Implementation Notes
1. **Schema must be `strict: false`** to allow additional fields
2. **Use sparse indexes** on optional unique fields
3. **Support both flat and array structures** for team members
4. **Normalize field names** on save (e.g., map `emailAddress` to `email`)
5. **Store original field names** in `formResponses` for audit trail
6. **Support file uploads** with Cloudinary integration

## Validation Requirements
- Email format validation
- Phone number validation (10-15 digits)
- File type validation (images, PDFs)
- Required field validation per event type
- Team size validation per event rules

---

**Last Updated**: February 19, 2026
**Status**: Complete field mapping from all registration forms
