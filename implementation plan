Okay, here is a simple, phased implementation plan for FileShare Pro, designed for a two-person team (1 Frontend Developer, 1 Backend Developer) to meet the core requirements outlined in the Project Details and PRD.

**Team Roles:**

*   **Frontend Developer (FE):** Responsible for the React application (UI/UX, API integration, state management).
*   **Backend Developer (BE):** Responsible for the Spring Boot API (business logic, database interaction, security, file handling).

**Core Principles:**

*   **Iterative Development:** Build core functionality first, then add features.
*   **Clear API Contracts:** Define API endpoints and data structures early in each phase.
*   **Frequent Communication:** Daily or regular sync-ups between FE and BE are crucial.
*   **Focus on MVP:** Prioritize requirements listed; defer "Future Considerations."

**Tools & Communication:**

*   **Version Control:** Git (e.g., GitHub, GitLab, Bitbucket) for code management.
*   **Task Management:** Simple board (Trello, Jira, GitHub Projects) to track progress.
*   **Communication:** Slack/Teams for quick questions, regular short calls for sync-ups.

---

**Implementation Plan**

**Phase 1: Foundation - User Authentication & Basic File Listing (Est. Duration: 1-2 weeks)**

*   **Goal:** Establish the project structure, implement user registration/login, and display uploaded files (no upload/download yet). Secure basic API endpoints.

*   **Backend Developer (BE) Tasks:**
    1.  **Project Setup:** Initialize Spring Boot project with dependencies (Web, Security, JPA, MySQL Driver, Lombok, JWT library).
    2.  **Database Schema:** Define initial `users` table (id, username, password_hash, display_name, created_at). Define initial `files` table (id, name, type, size, upload_date, owner_user_id).
    3.  **Entities & Repositories:** Create JPA entities (`User`, `File`) and Spring Data JPA repositories.
    4.  **User Registration:** Implement `/api/auth/register` endpoint (hash password using BCrypt).
    5.  **User Login & JWT:** Implement `/api/auth/login` endpoint (verify credentials, generate JWT on success).
    6.  **Spring Security Config:** Configure basic security to protect endpoints, implement JWT filter for validating tokens on incoming requests.
    7.  **Basic File Listing API:** Implement `/api/files` (GET) endpoint to return a list of files owned by the authenticated user (metadata only for now).
    8.  **Basic User Profile API:** Implement `/api/users/me` (GET) endpoint to return authenticated user's details (ID, username, display name).
    9.  **Initial Deployment Setup (Optional):** Basic setup for running the backend locally or in a simple cloud environment.

*   **Frontend Developer (FE) Tasks:**
    1.  **Project Setup:** Initialize React project using Vite, configure basic routing (react-router-dom).
    2.  **Styling Setup:** Choose CSS Modules or a simple CSS framework.
    3.  **API Client:** Set up Axios instance, including interceptor to automatically add JWT to headers after login.
    4.  **Component Structure:** Create basic layout components (Header, Footer, Main Content area).
    5.  **Pages:** Create initial pages: Login, Registration, Dashboard (File List), User Profile (view only).
    6.  **Authentication Forms:** Build Login and Registration forms, integrate with BE `/api/auth/login` and `/api/auth/register` endpoints. Implement JWT storage (e.g., localStorage/sessionStorage) and retrieval.
    7.  **Protected Routes:** Implement logic to redirect unauthenticated users from protected pages (Dashboard, Profile) to Login.
    8.  **File List Display:** Implement Dashboard page to call BE `/api/files` endpoint and display the list of files (metadata only).
    9.  **Profile Display:** Implement Profile page to call BE `/api/users/me` and display user info.
    10. **Basic Responsive Layout:** Ensure basic layout works on common screen sizes.

*   **Collaboration:** Define API contracts for `/auth/register`, `/auth/login`, `/files`, `/users/me` (request/response formats, status codes).

**Phase 2: Core Functionality - File Upload & Download (Est. Duration: 1-2 weeks)**

*   **Goal:** Enable users to upload files to the server and download their own files.

*   **Backend Developer (BE) Tasks:**
    1.  **File Storage:** Decide on storage strategy (e.g., local filesystem path configured in `application.properties`, cloud storage later). Create service layer for file operations.
    2.  **File Upload API:** Implement `/api/files/upload` (POST) endpoint:
        *   Receive multipart file data.
        *   Validate file (size limits, allowed types - optional).
        *   Store the file physically.
        *   Save file metadata (name, size, type, owner, upload date) to the `files` table in the database.
        *   Handle potential errors (disk full, permissions, etc.).
    3.  **File Download API:** Implement `/api/files/download/{fileId}` (GET) endpoint:
        *   Verify authenticated user owns the file.
        *   Retrieve file metadata from DB.
        *   Read the physical file from storage.
        *   Return file content as a stream (`Resource`) with appropriate `Content-Disposition` and `Content-Type` headers.
    4.  **Update File Listing API:** Ensure `/api/files` returns necessary info (including file IDs) for download links.

*   **Frontend Developer (FE) Tasks:**
    1.  **File Upload Component:** Create a file input component/form on the Dashboard.
    2.  **Upload Integration:** Call BE `/api/files/upload` endpoint using `FormData` to send the file.
    3.  **Upload Progress (Optional):** Implement basic progress indication during upload.
    4.  **Update File List:** Refresh the file list automatically after a successful upload.
    5.  **Download Integration:** Add Download buttons/links to the file list items. Clicking should trigger a request to the BE `/api/files/download/{fileId}` endpoint, which should initiate the browser download.
    6.  **Error Handling:** Display user-friendly messages for upload/download errors (e.g., file too large, unauthorized).

*   **Collaboration:** Define API contracts for `/files/upload` and `/files/download/{fileId}`. Agree on file size limits.

**Phase 3: Sharing Features & Polish (Est. Duration: 2-3 weeks)**

*   **Goal:** Implement file sharing using temporary keys and QR codes, refine UI/UX, and improve security/robustness.

*   **Backend Developer (BE) Tasks:**
    1.  **Database Schema:** Define `sharing_keys` table (id, key_value (6 digits), file_id, creator_user_id, expiry_time, created_at). Add index on `key_value`.
    2.  **Sharing Key Entity/Repo:** Create `SharingKey` JPA entity and repository.
    3.  **Generate Key API:** Implement `/api/files/{fileId}/share` (POST) endpoint:
        *   Verify authenticated user owns the file.
        *   Generate a unique 6-digit key (handle collisions).
        *   Set an expiration time (e.g., configurable, default 24 hours).
        *   Save the key details to the `sharing_keys` table.
        *   Return the generated key and expiry time.
    4.  **Download via Key API:** Implement `/api/share/download/{keyValue}` (GET) endpoint (publicly accessible):
        *   Find the `SharingKey` entry by `keyValue`.
        *   Validate if the key exists and is not expired.
        *   If valid, retrieve the associated file metadata and physical file.
        *   Return the file content as in Phase 2 download.
        *   If invalid/expired, return appropriate error (404 Not Found or 410 Gone).
    5.  **Get File Info via Key API (Optional but recommended for QR):** Implement `/api/share/info/{keyValue}` (GET) endpoint (publicly accessible) to return basic file info (name, size) for a valid key, used by the FE download page.
    6.  **Key Expiration Handling:** Implement a check on access. (A scheduled cleanup task for expired keys is good practice but can be deferred if needed).
    7.  **Refinement:** Improve error handling across all APIs. Add input validation. Review security configurations.

*   **Frontend Developer (FE) Tasks:**
    1.  **Sharing UI:** Add a "Share" button/icon to each file item in the list.
    2.  **Generate Key Integration:** On Share click, show a modal/dialog. Call BE `/api/files/{fileId}/share` endpoint.
    3.  **Display Key & QR:** Display the received 6-digit key and expiry time in the modal. Generate a QR code (using a library like `qrcode.react`) that encodes the public download URL (e.g., `yourdomain.com/shared/{keyValue}`).
    4.  **Public Download Page:** Create a new page/route like `/shared/:keyValue`.
    5.  **Shared File Download Logic:** On the public download page:
        *   Extract `keyValue` from the URL.
        *   (Optional) Call BE `/api/share/info/{keyValue}` to display file details before download.
        *   Provide a "Download" button that links directly to the BE `/api/share/download/{keyValue}` endpoint to initiate the download.
        *   Handle cases where the key is invalid or expired (display appropriate message).
    6.  **Profile Management:** Allow users to update their `display_name` (requires BE endpoint update).
    7.  **UI/UX Polish:** Refine styles, ensure responsiveness across mobile/desktop, add loading states, improve feedback messages.
    8.  **Testing:** Thoroughly test all features, especially authentication and sharing flows.

*   **Collaboration:** Define API contracts for `/files/{fileId}/share`, `/share/download/{keyValue}`, and optionally `/share/info/{keyValue}`. Define the structure of the public download URL for QR codes.

**Post-Implementation:**

*   **Testing:** Comprehensive end-to-end testing.
*   **Documentation:** Finalize basic READMEs for FE and BE, document API endpoints (e.g., using Swagger/OpenAPI for BE).
*   **Deployment:** Prepare production builds and deploy FE (static hosting) and BE (cloud platform/container) following the choices in the PRD. Configure database connection for the deployed environment.

This phased plan provides a clear path to building FileShare Pro with a small team, focusing on delivering core value incrementally. Remember to adapt the estimated durations based on actual progress and complexity encountered.
