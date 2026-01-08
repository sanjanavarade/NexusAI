
# NexusAI: Production Backend Architecture

### 1. System Design Principles
- **Microservices Oriented:** Decoupled services for Auth, Incident Management, AI Triage, and Notification.
- **Event-Driven:** Uses Redis/RabbitMQ for background tasks (like AI processing) to keep the main API thread responsive.
- **Stateless API:** JWT-based authentication for horizontal scaling via Docker/K8s.

### 2. Tech Stack Detail
- **Runtime:** Node.js (Express.js)
- **Database:** MongoDB (Atlas)
- **Real-time:** Socket.io with Redis adapter for multi-node support.
- **Caching:** Redis for session data and frequent incident lookups.
- **Validation:** Joi/Zod for strict input sanitization.

### 3. MongoDB Schema Design
#### Incident Schema (Key Indexes)
- `status`: Index for dashboard filtering.
- `priority`: Index for critical alert sorting.
- `location`: Geospatial index `2dsphere` for proximity searching.
- `createdAt`: TTL index if archiving is needed.

### 4. Security Implementation
- **RBAC Middleware:** Custom middleware checking user roles before allowing `PATCH/DELETE` on incidents.
- **Rate Limiting:** `express-rate-limit` to prevent brute force on report endpoints.
- **XSS Prevention:** `helmet` and `xss-clean` middleware.
- **CORS:** Strict whitelist configuration.

### 5. Deployment Flow
1. **CI/CD:** GitHub Actions triggers on push.
2. **Containerization:** Multi-stage Docker build.
3. **Orchestration:** Kubernetes (GKE/EKS) with horizontal pod autoscaling based on CPU/Memory usage.
