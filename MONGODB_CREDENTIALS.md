# MongoDB Atlas Credentials

**DO NOT SHARE THIS FILE OR COMMIT IT TO VERSION CONTROL**

## Connection Details

**Database Type:** MongoDB Atlas (Cloud)

**Connection String:**
```
mongodb+srv://Nate:Nathan%402001@clusterinfo.orhwuyp.mongodb.net/youthportal?retryWrites=true&w=majority&appName=ClusterInfo
```

**Cluster:** ClusterInfo
**Host:** clusterinfo.orhwuyp.mongodb.net

**Username:** Nate
**Password:** Nathan@2001
**Password (URL-encoded):** Nathan%402001

**Database Name:** youthportal

## Usage

This connection string is already configured in `backend/.env`:

```env
MONGO_URI=mongodb+srv://Nate:Nathan%402001@clusterinfo.orhwuyp.mongodb.net/youthportal?retryWrites=true&w=majority&appName=ClusterInfo
```

## Security Notes

1. **Keep this file private** - Add to `.gitignore` if using Git
2. Consider rotating credentials periodically
3. Use IP whitelisting in MongoDB Atlas console for production
4. For production, store credentials in environment variables or secrets manager

## MongoDB Driver

Already installed via `npm install` in backend:
```bash
npm install mongodb
```

Driver version is managed in `backend/package.json` via mongoose dependency.
