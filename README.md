# 🤖 ML Platform — AI Model Deployment Platform

A full-stack platform for deploying and managing ML models, featuring GitHub OAuth authentication, containerized microservices, Kubernetes orchestration, and automated CI/CD pipelines.

---

## 🌐 Live Demo

Live Project:
[YAML Model Platform Live Demo](https://yaml-model.vercel.app)

> Frontend: `http://localhost:5173`
> Backend API: `http://localhost:5000`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Browser                      │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│         Frontend (React + Vite + Vercel)            │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│        Backend (Node.js + Express + Render)         │
│           GitHub OAuth via Passport.js              │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              GitHub OAuth API                       │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI Framework |
| React Router v7 | Client-side routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| TypeScript | Type safety |
| Passport.js | OAuth middleware |
| passport-github2 | GitHub OAuth strategy |
| express-session | Session management |

### DevOps
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Local orchestration |
| Kubernetes | Production orchestration |
| GitHub Actions | CI/CD pipeline |
| Docker Hub | Container registry |

---

## 📁 Project Structure

```
ml-platform/
├── .github/
│   └── workflows/
│       └── ci-cd.yaml          # CI/CD pipeline
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── passport.ts     # GitHub OAuth config
│   │   ├── routes/
│   │   │   ├── auth-routes.ts  # Auth endpoints
│   │   │   └── deploy-routes.ts
│   │   └── index.ts            # Express server
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── configmap.yaml
│   └── secret.yaml
├── docker-compose.yaml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- Kubernetes (Docker Desktop or kind)
- GitHub OAuth App credentials

### 1. Clone the Repository

```bash
git clone https://github.com/TusharChoudharykp/Yaml-Model.git
cd Yaml-Model
```

### 2. Create GitHub OAuth App

1. Go to **GitHub → Settings → Developer Settings → OAuth Apps**
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** `ML Platform`
   - **Homepage URL:** `http://localhost:5173`
   - **Callback URL:** `http://localhost:5000/auth/github/callback`
4. Copy **Client ID** and **Client Secret**

### 3. Setup Environment Variables

Create `.env` file in the project root:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
SESSION_SECRET=your_strong_random_secret
FRONTEND_URL=http://localhost:5173
```

---

## 🐳 Running with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Run in background
docker compose up -d

# Stop all services
docker compose down
```

Access the app:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## ☸️ Running with Kubernetes

### 1. Apply Kubernetes Configs

```bash
# Create secrets (update values first)
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml

# Deploy services
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

### 2. Verify Pods are Running

```bash
kubectl get pods
kubectl get services
```

Expected output:
```
NAME                           READY   STATUS    RESTARTS   AGE
ml-backend-xxxxxxxxx           1/1     Running   0          1m
ml-frontend-xxxxxxxxx          1/1     Running   0          1m
```

### 3. Access the App (Port Forwarding)

Open two terminals:

```bash
# Terminal 1 - Backend
kubectl port-forward service/ml-backend 5000:5000

# Terminal 2 - Frontend
kubectl port-forward service/ml-frontend 5173:5173
```

---

## 🔄 CI/CD Pipeline

The project uses **GitHub Actions** for automated builds and deployments.

### Pipeline Flow

```
git push / git tag → GitHub Actions → Build Images → Push to DockerHub
```

### Triggers

| Trigger | Action |
|---|---|
| `git push origin main` | Builds and pushes `:latest` images |
| `git push origin v1.0.0` | Builds and pushes `:latest` + `:v1.0.0` images |

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password |


### Docker Hub Images

| Image | URL |
|---|---|
| Backend | `tusharchoudhary2002/ml-platform-backend` |
| Frontend | `tusharchoudhary2002/ml-platform-frontend` |

---

## 🔐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/github` | Initiates GitHub OAuth flow |
| `GET` | `/auth/github/callback` | GitHub OAuth callback |
| `GET` | `/auth/me` | Returns current user info |

### Example Response `/auth/me`

```json
{
  "success": true,
  "user": {
    "username": "TusharChoudharykp",
    "avatar": "https://avatars.githubusercontent.com/...",
    "profileUrl": "https://github.com/TusharChoudharykp"
  }
}
```

---

## 🐛 Troubleshooting

### InternalOAuthError in Docker

```bash
# Check DNS resolution inside container
docker exec ml-backend wget -qO- https://api.github.com

# Fix: Add DNS to docker-compose.yaml
dns:
  - 8.8.8.8
  - 8.8.4.4
```

### Env Vars Not Loading

```bash
# Verify env vars in container
docker exec ml-backend env | grep GITHUB

# Verify env vars in kubernetes pod
kubectl exec deployment/ml-backend -- env | findstr GITHUB
```

### Pod Not Starting

```bash
# Check pod logs
kubectl logs deployment/ml-backend
kubectl describe pod <pod-name>
```

---

## 📊 Key Learnings & Challenges

| Challenge | Root Cause | Solution |
|---|---|---|
| OAuth fails in Docker | DNS resolution failure in WSL2 | Added `dns: 8.8.8.8` to compose |
| Env vars not loading | dotenv v17 = dotenvx, loads 0 vars | Downgraded to dotenv v16 |
| React routes 404 in Docker | Nginx no SPA routing | Replaced with `serve -s` |
| CI/CD build fails | `.env` copied in Dockerfile | Removed `COPY .env .env` |

---

## 📄 License

MIT License — feel free to use this project for learning and interviews.

---

## 👨‍💻 Author

**Tushar Choudhary**
- GitHub: [@TusharChoudharykp](https://github.com/TusharChoudharykp)
- Docker Hub: [tusharchoudhary2002](https://hub.docker.com/u/tusharchoudhary2002)
