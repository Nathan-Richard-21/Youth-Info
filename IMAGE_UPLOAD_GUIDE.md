# 📸 Image Upload Feature - Already Implemented!

## ✅ What's Already Working

The image upload feature for stakeholder opportunity postings is **fully functional**! Here's what you have:

### Backend (Already Complete)
- ✅ **Upload Route**: `/api/upload/image` (in `backend/routes/upload.js`)
- ✅ **Multer Configuration**: Handles image uploads up to 5MB
- ✅ **File Validation**: Only accepts image files
- ✅ **Static File Serving**: Images served from `/uploads` directory
- ✅ **Database**: `imageUrl` field in Opportunity model

### Frontend (Already Complete)
- ✅ **Upload UI**: Image upload button in AdminPostPortal (Step 1 - Basic Information)
- ✅ **Image Preview**: Shows uploaded image before publishing
- ✅ **Image Display**: Automatically shows images on all opportunity pages (Bursaries, Careers, etc.)
- ✅ **Responsive**: Image adapts to different screen sizes

## 🎯 How to Use (For Stakeholders)

### 1. Navigate to Post Opportunity
- Go to Admin/Stakeholder dashboard
- Click "Post New Opportunity"

### 2. Upload Image (Step 1 - Basic Information)
- Fill in Title, Description, and Category
- Look for the **"Upload Image"** section
- Click the **"Choose Image"** button
- Select an image file (JPG, PNG, GIF, etc.)
- Maximum size: **5MB**
- Image will be uploaded and preview shown

### 3. Complete Other Details
- Continue through Steps 2-4
- Add requirements, dates, and other information
- Review and publish

### 4. View Your Posted Opportunity
- The image will appear at the top of the opportunity card
- Visible on: Bursaries page, Careers page, Learnerships page, etc.

## 📂 File Locations

### Backend Files
```
backend/
├── routes/upload.js          # Image upload API endpoint
├── models/Opportunity.js     # imageUrl field defined here
├── uploads/                  # Uploaded images stored here
└── server.js                 # Static file serving configured
```

### Frontend Files
```
frontend/src/pages/
├── AdminPostPortal.jsx       # Image upload UI (lines 135-177)
├── Bursaries.jsx            # Displays images (lines 175-182)
├── Careers.jsx              # Displays images
├── Learnerships.jsx         # Displays images
└── BusinessFunding.jsx      # Displays images
```

## 🎨 Image Display Specifications

### On Opportunity Cards
- **Height**: 180px
- **Object Fit**: Cover (maintains aspect ratio)
- **Position**: Top of card, above title and description
- **Fallback**: If image fails to load, it's hidden automatically
- **Responsive**: Scales on mobile devices

### Example Code (from Bursaries.jsx)
```jsx
{b.imageUrl && (
  <Box
    component="img"
    src={b.imageUrl}
    alt={b.title}
    sx={{ height: 180, objectFit: 'cover' }}
    onError={(e) => e.target.style.display = 'none'}
  />
)}
```

## 🔒 Security Features

1. **Authentication Required**: Only authenticated users can upload
2. **File Type Validation**: Only image files accepted
3. **Size Limit**: 5MB maximum file size
4. **Unique Filenames**: Prevents file name conflicts
5. **Error Handling**: Proper error messages for failed uploads

## 🚀 API Endpoints

### Upload Single Image
```http
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body: { image: <file> }

Response:
{
  "message": "Image uploaded successfully",
  "imageUrl": "/uploads/1234567890-123456789.jpg",
  "filename": "1234567890-123456789.jpg"
}
```

### Upload Multiple Files
```http
POST /api/upload/multiple
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body: { files: [<file1>, <file2>, ...] }

Response:
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "url": "/uploads/1234567890-123456789.jpg",
      "filename": "1234567890-123456789.jpg",
      "originalName": "company-logo.jpg",
      "size": 154234,
      "mimetype": "image/jpeg"
    }
  ]
}
```

### Delete Uploaded File
```http
DELETE /api/upload/:filename
Authorization: Bearer <token>

Response:
{
  "message": "File deleted successfully"
}
```

## 💡 Tips for Best Results

### Image Recommendations
- **Dimensions**: 800x600px or similar 4:3 ratio
- **Format**: JPG or PNG recommended
- **Size**: Under 1MB for faster loading
- **Content**: 
  - Company/organization logos
  - Event photos
  - Relevant promotional images
  - Professional, high-quality images

### For Stakeholders
1. Use clear, professional images
2. Ensure images are relevant to the opportunity
3. Avoid copyrighted images
4. Test image on mobile and desktop
5. Use descriptive filenames

## 🐛 Troubleshooting

### Image Not Uploading
1. Check file size (must be < 5MB)
2. Ensure file is an image (JPG, PNG, GIF, etc.)
3. Verify you're logged in
4. Check internet connection
5. Try a different image

### Image Not Displaying
1. Check that imageUrl was saved in database
2. Verify uploads directory exists on server
3. Check image file still exists in /uploads
4. Inspect browser console for errors
5. Try refreshing the page

### Common Errors
- **"Only image files are allowed!"**: Selected file is not an image
- **"Image size must be less than 5MB"**: File too large
- **"No file uploaded"**: No file was selected
- **"Failed to upload image"**: Server error, check backend logs

## 📝 Example Usage Flow

```javascript
// 1. User selects image
<input 
  type="file" 
  accept="image/*"
  onChange={handleImageUpload}
/>

// 2. Frontend uploads to backend
const formData = new FormData()
formData.append('image', imageFile)
await api.post('/upload/image', formData)

// 3. Backend saves file and returns URL
// Returns: { imageUrl: "/uploads/123456.jpg" }

// 4. Frontend saves URL in opportunity
setFormData({ ...formData, imageUrl: response.data.imageUrl })

// 5. Opportunity posted with image
await api.post('/opportunities', formData)

// 6. Image displays on opportunity card
<img src={opportunity.imageUrl} alt={opportunity.title} />
```

## ✨ Feature Status: COMPLETE ✅

Everything is already implemented and working! Stakeholders can:
- ✅ Upload images when posting opportunities
- ✅ See image preview before publishing
- ✅ View images on all opportunity listings
- ✅ Images are properly sized and responsive
- ✅ Secure upload with validation

No additional development needed - the feature is ready to use!

---

**Last Updated**: November 26, 2025
**Status**: Production Ready ✅
