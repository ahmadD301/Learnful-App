# MindQuest MongoDB Database Structure

## Overview
This document provides a complete structure of the MindQuest MongoDB database, including all collections, schemas, relationships, and indexes.

---

## Collections

### 1. User Collection
**Model:** `User`  
**Description:** Stores all user accounts (students, teachers, and admins)

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `name` | String | ✓ | User's full name |
| `email` | String | ✓ | Unique email address |
| `password` | String | Conditional | Required for non-Google sign-in |
| `googleAuth` | Boolean | - | Indicates Google authentication (default: false) |
| `profileImage` | String | - | URL or path to profile image |
| `role` | String | ✓ | User role: "admin", "teacher", or "student" |
| `status` | String | - | Account status: "pending", "active", "rejected", "banned" (teachers default to "pending", others to "active") |
| `banReason` | String | - | Reason for ban if status is "banned" |
| `teacherData` | Object | - | Teacher-specific information (see below) |
| `studentData` | Object | - | Student-specific information (see below) |
| `savedObjects` | Array | - | Saved animation objects library |
| `createdAt` | Date | Auto | Account creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Teacher Data Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `specialization` | String | Teacher's area of expertise |
| `institution` | String | Educational institution |
| `certification` | String | URL or base64 encoded certification |
| `score` | Number | Teacher performance score (default: 0) |
| `rejectionReason` | String | Reason if application was rejected |

#### Student Data Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `score` | Number | Student's total score (default: 0) |
| `finishedCourses` | Number | Count of completed courses (default: 0) |
| `enrolledCourses` | Array[ObjectId] | References to enrolled Course documents |
| `courseProgress` | Array[Object] | Detailed progress for each course (see below) |

#### Course Progress Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `courseId` | ObjectId | Reference to Course |
| `completedLessons` | Array[ObjectId] | References to completed Lesson documents |
| `currentLessonId` | ObjectId | Reference to current Lesson |
| `lastAccessed` | Date | Last access timestamp |
| `quizCompleted` | Boolean | Quiz completion status (default: false) |
| `quizScore` | Number | Quiz score (default: 0) |
| `createdAt` | Date | Progress record creation |
| `updatedAt` | Date | Last progress update |

#### Saved Objects Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Object identifier |
| `name` | String | Object name |
| `type` | String | Object type: "circle", "square", "triangle", "rectangle", "text", "group" |
| `transitions` | Array[Object] | Animation transitions |
| `children` | Array | Child objects |

#### Indexes:
- `email`: Unique index

---

### 2. Teacher Collection
**Model:** `Teacher`  
**Description:** Extended teacher profile information

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | ✓ | Reference to User document |
| `name` | String | ✓ | Teacher's name |
| `email` | String | ✓ | Teacher's email |
| `avatar` | String | - | Profile avatar URL |
| `specialization` | String | - | Area of expertise |
| `experience` | Number | - | Years of experience |
| `bio` | String | - | Biography |
| `phone` | String | - | Contact phone number |
| `link` | String | - | Personal/professional website |
| `totalPoints` | Number | - | Accumulated points (default: 0) |
| `rating` | Number | - | Teacher rating (default: 0) |
| `totalCourses` | Number | - | Total courses created (default: 0) |
| `totalStudents` | Number | - | Total students taught (default: 0) |
| `createdAt` | Date | Auto | Record creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 3. Course Collection
**Model:** `Course`  
**Description:** Stores course information and metadata

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `title` | String | ✓ | Course title |
| `description` | String | - | Course description |
| `thumbnail` | String | - | Course thumbnail URL |
| `teacherId` | ObjectId | ✓ | Reference to User (teacher) |
| `lessonIds` | Array[ObjectId] | - | References to Lesson documents |
| `quizId` | ObjectId | - | Reference to Quiz document |
| `category` | String | - | Course category (default: "General") |
| `difficulty` | String | - | Difficulty level: "Beginner", "Intermediate", "Advanced" (default: "Beginner") |
| `enrollmentCount` | Number | - | Real enrollment count (default: 0) |
| `averageRating` | Number | - | Average rating 0-5 (default: 0) |
| `ratingCount` | Number | - | Number of ratings (default: 0) |
| `rating` | Number | - | Legacy field (deprecated) |
| `students` | Number | - | Legacy field (deprecated) |
| `duration` | String | - | Estimated course duration (default: "4 weeks") |
| `lessonsCount` | Number | - | Number of lessons (default: 0) |
| `price` | Number | - | Course price (default: 0) |
| `tags` | Array[String] | - | Course tags |
| `scoreOnFinish` | Number | - | Score awarded on completion (default: 0) |
| `published` | Boolean | - | Publication status (default: false) |
| `archived` | Boolean | - | Archive status (default: false) |
| `approvalStatus` | String | - | Approval status: "draft", "pending", "approved", "rejected" (default: "draft") |
| `submittedAt` | Date | - | Submission timestamp |
| `reviewedAt` | Date | - | Review timestamp |
| `reviewedBy` | ObjectId | - | Reference to User (admin) |
| `rejectionReason` | String | - | Reason if rejected |
| `createdAt` | Date | Auto | Course creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 4. Lesson Collection
**Model:** `Lesson`  
**Description:** Stores individual lessons within courses

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `title` | String | ✓ | Lesson title |
| `courseId` | ObjectId | ✓ | Reference to Course |
| `fieldIds` | Array[ObjectId] | - | References to Field documents |
| `isPreview` | Boolean | - | Allow non-enrolled users to view (default: false) |
| `createdAt` | Date | Auto | Lesson creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 5. Field Collection
**Model:** `Field`  
**Description:** Stores content fields/blocks within lessons

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `lessonId` | ObjectId | ✓ | Reference to Lesson |
| `type` | String | ✓ | Field type: "paragraph", "image", "youtube", "html", "minigame", "question", "code", "animation", "table" |
| `content` | Mixed | - | Field content (string, object, or URL) |
| `questionId` | ObjectId | - | Legacy reference to Question document |
| `questionType` | String | - | Inline question type: "mcq", "tf", "short" |
| `options` | Array[String] | - | Question options |
| `correctAnswer` | String | - | Correct answer |
| `correctAnswerIndex` | Number | - | Correct answer index for MCQ |
| `points` | Number | - | Points awarded (default: 1) |
| `explanation` | String | - | Answer explanation |
| `migratedFromQuestionId` | ObjectId | - | Reference if migrated from Question document |
| `animationId` | ObjectId | - | Reference to Animation document |
| `animationPreviewMode` | String | - | Animation preview mode: "start-stop", "loop" (default: "start-stop") |
| `order` | Number | - | Display order (default: 0) |
| `createdAt` | Date | Auto | Field creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 6. Question Collection
**Model:** `Question`  
**Description:** Stores standalone questions (legacy, migrating to inline questions in Field)

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `text` | String | ✓ | Question text |
| `type` | String | - | Question type: "mcq", "tf", "short" (default: "mcq") |
| `options` | Array[String] | - | Answer options |
| `correctAnswer` | String | ✓ | Correct answer |
| `correctAnswerIndex` | Number | - | Correct answer index for MCQ |
| `points` | Number | - | Points awarded (default: 1) |
| `explanation` | String | - | Answer explanation |
| `createdAt` | Date | Auto | Question creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 7. Quiz Collection
**Model:** `Quiz`  
**Description:** Stores final course quizzes

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `title` | String | ✓ | Quiz title (default: "Final Quiz") |
| `courseId` | ObjectId | ✓ | Reference to Course |
| `questionIds` | Array[ObjectId] | - | References to Question documents |
| `createdAt` | Date | Auto | Quiz creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

### 8. Progress Collection
**Model:** `Progress`  
**Description:** Tracks student progress in courses

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `studentId` | ObjectId | ✓ | Reference to User (student) |
| `courseId` | ObjectId | ✓ | Reference to Course |
| `completedLessons` | Array[ObjectId] | - | References to completed Lesson documents |
| `quizScore` | Number | - | Quiz score (default: 0) |
| `totalScore` | Number | - | Total accumulated score (default: 0) |
| `status` | String | - | Progress status: "in-progress", "completed" (default: "in-progress") |
| `createdAt` | Date | Auto | Progress record creation |
| `updatedAt` | Date | Auto | Last progress update |

#### Indexes:
- `{ studentId: 1, courseId: 1 }`: Unique compound index

---

### 9. Review Collection
**Model:** `Review`  
**Description:** Stores student course reviews

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `courseId` | ObjectId | ✓ | Reference to Course |
| `studentId` | ObjectId | ✓ | Reference to User (student) |
| `rating` | Number | ✓ | Rating 1-5 |
| `comment` | String | - | Review comment (max 500 characters) |
| `createdAt` | Date | Auto | Review creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Indexes:
- `{ courseId: 1, studentId: 1 }`: Unique compound index (one review per student per course)

---

### 10. ReviewReport Collection
**Model:** `ReviewReport`  
**Description:** Stores reports on inappropriate reviews

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `reviewId` | ObjectId | ✓ | Reference to Review |
| `reporterId` | ObjectId | ✓ | Reference to User (reporter) |
| `reason` | String | ✓ | Report reason: "Spam or misleading", "Hate speech or abusive content", "Harassment or bullying", "Inappropriate content", "Other" |
| `additionalInfo` | String | - | Additional information (max 500 characters) |
| `status` | String | - | Report status: "pending", "resolved", "dismissed" (default: "pending") |
| `resolvedAt` | Date | - | Resolution timestamp |
| `resolvedBy` | ObjectId | - | Reference to User (admin) |
| `createdAt` | Date | Auto | Report creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Indexes:
- `{ reviewId: 1, reporterId: 1 }`: Unique compound index (prevents duplicate reports)

---

### 11. Animation Collection
**Model:** `Animation`  
**Description:** Stores animation content for lessons

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `title` | String | ✓ | Animation title (max 200 characters) |
| `description` | String | - | Animation description (max 1000 characters) |
| `authorId` | ObjectId | ✓ | Reference to User (creator) |
| `mode` | String | - | Animation mode: "timeline", "slides" (default: "timeline") |
| `duration` | Number | - | Animation duration in seconds (default: 15) |
| `durationOverride` | Number | - | Manual duration override |
| `canvasWidth` | Number | - | Canvas width in pixels |
| `canvasHeight` | Number | - | Canvas height in pixels |
| `connections` | Array[Object] | - | Object connections (see below) |
| `objects` | Array[Object] | - | Animation objects for timeline mode (see below) |
| `slideData` | Object | - | Slide mode data (see below) |
| `isPublished` | Boolean | - | Publication status (default: false) |
| `tags` | Array[String] | - | Animation tags |
| `createdAt` | Date | Auto | Animation creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Connection Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `fromId` | String | Source object ID |
| `toId` | String | Target object ID |
| `color` | String | Connection color (default: "#facc15") |
| `width` | Number | Line width (default: 2) |

#### Animation Object Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Object unique identifier |
| `name` | String | Object name |
| `type` | String | Object type: "circle", "square", "triangle", "rectangle", "text", "group" |
| `transitions` | Array[Object] | Animation transitions (see below) |
| `children` | Array | Child objects for groups |
| `x` | Number | X position |
| `y` | Number | Y position |
| `width` | Number | Object width |
| `height` | Number | Object height |
| `scale` | Number | Scale factor (default: 1) |
| `rotation` | Number | Rotation in degrees (default: 0) |
| `color` | String | Object color |
| `fillColor` | String | Fill color |
| `strokeColor` | String | Stroke color |
| `borderWidth` | Number | Border width (default: 2) |
| `openTop` | Boolean | Open top for certain shapes (default: false) |
| `text` | String | Text content |
| `opacity` | Number | Opacity 0-1 (default: 1) |
| `visible` | Boolean | Visibility status (default: true) |

#### Transition Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `startTime` | Number | Start time in seconds |
| `duration` | Number | Transition duration |
| `x` | Number | Target X position |
| `y` | Number | Target Y position |
| `width` | Number | Target width |
| `height` | Number | Target height |
| `scale` | Number | Target scale (default: 1) |
| `rotation` | Number | Target rotation (default: 0) |
| `color` | String | Target color |
| `fillColor` | String | Target fill color |
| `strokeColor` | String | Target stroke color |
| `borderWidth` | Number | Target border width (default: 2) |
| `openTop` | Boolean | Target open top state (default: false) |
| `text` | String | Target text content |
| `opacity` | Number | Target opacity (default: 1) |
| `easing` | String | Easing function (default: "linear") |

#### Slide Data Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `slides` | Array[Object] | Array of slide objects (see below) |
| `objectLibrary` | Array[Object] | Reusable animation objects |

#### Slide Sub-schema:
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Slide identifier |
| `time` | Number | Slide start time (default: 0) |
| `duration` | Number | Slide duration (default: 1.0) |
| `easing` | String | Transition easing (default: "ease-in-out") |
| `objects` | Array[Object] | Objects in this slide |
| `connections` | Array[Object] | Connections in this slide |

#### Indexes:
- `authorId`: Standard index
- `title`: Standard index
- `createdAt`: Descending index

---

### 12. Image Collection
**Model:** `Image`  
**Description:** Stores uploaded images for courses and lessons

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `filename` | String | ✓ | Generated filename |
| `originalName` | String | ✓ | Original uploaded filename |
| `mimetype` | String | - | MIME type (default: "image/png") |
| `data` | Buffer | ✓ | Binary image data |
| `size` | Number | ✓ | File size in bytes |
| `uploadedBy` | ObjectId | - | Reference to User (uploader) |
| `courseId` | ObjectId | - | Associated Course reference |
| `fieldId` | String | - | Associated field ID |
| `createdAt` | Date | Auto | Upload timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Indexes:
- `filename`: Standard index
- `courseId`: Standard index
- `createdAt`: Standard index

---

### 13. Message Collection
**Model:** `Message`  
**Description:** Stores chat messages between teachers and students

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `content` | String | ✓ | Message content |
| `sender` | String | ✓ | Sender type: "teacher", "student" |
| `teacher` | ObjectId | ✓ | Reference to User (teacher) |
| `student` | ObjectId | ✓ | Reference to User (student) |
| `read` | Boolean | - | Read status (default: false) |
| `createdAt` | Date | Auto | Message timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Indexes:
- `{ teacher: 1, student: 1, createdAt: -1 }`: Compound index for efficient pagination

---

### 14. Notification Collection
**Model:** `Notification`  
**Description:** Stores system notifications for users

#### Schema Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `recipientId` | ObjectId | ✓ | Reference to User (recipient) |
| `type` | String | ✓ | Notification type: "course_approved", "course_rejected", "enrollment", "review", "report_status", "payment" |
| `title` | String | ✓ | Notification title |
| `message` | String | ✓ | Notification message |
| `entityId` | String | - | Related entity ID (course, review, report, etc.) |
| `metadata` | Mixed | - | Additional data (courseName, status, etc.) |
| `isRead` | Boolean | - | Read status (default: false) |
| `createdAt` | Date | Auto | Notification timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

#### Indexes:
- `{ recipientId: 1, createdAt: -1 }`: Compound index for listing notifications
- `{ recipientId: 1, isRead: 1 }`: Compound index for filtering by read status

---

## Collection Relationships

### User Relationships
- **User** → **Course** (1:N) - via `teacherId`
- **User** → **Animation** (1:N) - via `authorId`
- **User** → **Image** (1:N) - via `uploadedBy`
- **User** → **Message** (1:N) - via `teacher` and `student`
- **User** → **Notification** (1:N) - via `recipientId`
- **User** → **Progress** (1:N) - via `studentId`
- **User** → **Review** (1:N) - via `studentId`
- **User** → **ReviewReport** (1:N) - via `reporterId` and `resolvedBy`
- **User** → **Teacher** (1:1) - via `userId`
- **User.studentData.enrolledCourses** → **Course** (N:M)
- **User.studentData.courseProgress** → **Course**, **Lesson** (N:M)

### Course Relationships
- **Course** → **Lesson** (1:N) - via `lessonIds`
- **Course** → **Quiz** (1:1) - via `quizId`
- **Course** → **Progress** (1:N) - inverse relationship
- **Course** → **Review** (1:N) - inverse relationship
- **Course** → **Image** (1:N) - via `courseId`

### Lesson Relationships
- **Lesson** → **Field** (1:N) - via `fieldIds`
- **Lesson** → **Progress.completedLessons** (N:M)

### Field Relationships
- **Field** → **Question** (1:1) - via `questionId` (legacy)
- **Field** → **Animation** (1:1) - via `animationId`

### Quiz Relationships
- **Quiz** → **Question** (1:N) - via `questionIds`

### Review Relationships
- **Review** → **ReviewReport** (1:N) - inverse relationship

---

## Database Design Patterns

### 1. Polymorphic User Types
Users are stored in a single collection with role-based sub-documents (`teacherData`, `studentData`). This allows flexible querying while maintaining data integrity.

### 2. Embedded vs Referenced Documents
- **Embedded**: Transitions, objects within animations; course progress within user
- **Referenced**: Courses, lessons, fields (frequently queried independently)

### 3. Workflow States
- **User status**: pending → active/rejected (for teachers)
- **Course approvalStatus**: draft → pending → approved/rejected
- **ReviewReport status**: pending → resolved/dismissed

### 4. Soft Deletion
Courses use `archived` flag instead of deletion to maintain data integrity.

### 5. Denormalization for Performance
- Course metrics (enrollmentCount, averageRating) stored directly on Course for faster queries
- Teacher statistics stored in Teacher collection

---

## Index Strategy

### Performance Indexes
1. **User**: `email` (unique)
2. **Progress**: `{ studentId, courseId }` (unique compound)
3. **Review**: `{ courseId, studentId }` (unique compound)
4. **ReviewReport**: `{ reviewId, reporterId }` (unique compound)
5. **Message**: `{ teacher, student, createdAt }` (compound for pagination)
6. **Notification**: `{ recipientId, createdAt }`, `{ recipientId, isRead }`
7. **Animation**: `authorId`, `title`, `createdAt`
8. **Image**: `filename`, `courseId`, `createdAt`

---

## Data Validation Rules

### Email Format
- Must be unique across all users
- Email validation handled at application level

### Rating Constraints
- Review ratings: 1-5 (enforced in schema)
- Course averageRating: 0-5 (enforced in schema)

### String Length Limits
- Course title: Unlimited (consider adding)
- Animation title: 200 characters
- Animation description: 1000 characters
- Review comment: 500 characters
- ReviewReport additionalInfo: 500 characters

### Required Conditional Fields
- User password: Required unless `googleAuth` is true
- Teacher status: Defaults to "pending", others to "active"

---

## Migration Notes

### Question Migration
The system is transitioning from standalone Question documents to inline questions within Field documents:
- New questions should be stored directly in Field
- Legacy questions maintained via `questionId` reference
- `migratedFromQuestionId` tracks migration history

### Rating System
- Legacy `rating` and `students` fields deprecated in favor of `averageRating`, `ratingCount`, and `enrollmentCount`
- Both maintained for backward compatibility

---

## Best Practices

### 1. Querying Nested Progress
```javascript
// Find student's progress in specific course
User.findOne({
  _id: studentId,
  'studentData.courseProgress.courseId': courseId
})
```

### 2. Updating Course Metrics
```javascript
// Update enrollment count and rating when student enrolls/reviews
Course.findByIdAndUpdate(courseId, {
  $inc: { enrollmentCount: 1 }
})
```

### 3. Efficient Pagination
```javascript
// Use indexed fields for cursor-based pagination
Message.find({ teacher: teacherId, student: studentId })
  .sort({ createdAt: -1 })
  .limit(20)
```

### 4. Image Handling
```javascript
// Don't select data field by default for list operations
Image.find().select('-data')
```

---

## Document Size Considerations

### Large Documents
- **Animation**: Can be large due to embedded objects and transitions (monitor size)
- **Image**: Buffer storage (consider moving to GridFS if >16MB)
- **User.savedObjects**: Potentially large array (consider separate collection if needed)

### Optimization Strategies
- Use projection to exclude large fields when not needed
- Consider pagination for arrays with many elements
- Monitor document sizes and split if approaching 16MB limit

---

## Timestamp Fields
All collections include automatic timestamps:
- `createdAt`: Document creation time
- `updatedAt`: Last modification time

These are automatically managed by Mongoose when `{ timestamps: true }` is set in schema options.

---

## Future Considerations

### Potential Improvements
1. Add TTL index on notifications for auto-cleanup
2. Implement sharding strategy for User collection as it grows
3. Consider separate collection for User.savedObjects if library grows large
4. Add versioning for Animation documents
5. Implement soft delete pattern for Reviews
6. Add audit trail collection for sensitive operations

### Scalability
- Current design supports up to millions of documents
- Consider read replicas for analytics queries
- Implement caching layer for frequently accessed data (courses, user profiles)
- Use aggregation pipelines for complex reporting

---

**Document Version:** 1.0  
**Last Updated:** January 27, 2026  
**Database Type:** MongoDB  
**Total Collections:** 14
