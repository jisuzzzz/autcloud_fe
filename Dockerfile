# Node.js 환경에서 빌드
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# 환경 세팅
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]
