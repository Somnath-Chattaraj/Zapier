# Zapier Clone
[![GitHub release](https://img.shields.io/github/v/release/Somnath-Chattaraj/Zapier)](https://github.com/Somnath-Chattaraj/Zapier/releases)
[![GitHub issues](https://img.shields.io/github/issues/Somnath-Chattaraj/Zapier)](https://github.com/Somnath-Chattaraj/Zapier/issues)
[![GitHub forks](https://img.shields.io/github/forks/Somnath-Chattaraj/Zapier)](https://github.com/Somnath-Chattaraj/Zapier/network)
[![GitHub stars](https://img.shields.io/github/stars/Somnath-Chattaraj/Zapier)](https://github.com/Somnath-Chattaraj/Zapier/stargazers)
[![License: Royalty License](https://img.shields.io/badge/License-Royalty-blue)](https://github.com/Somnath-Chattaraj/Zapier/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
### **Overview**

This is a scalable and modular Zapier clone designed to handle webhooks, email notifications, and Solana blockchain integration. Built with modern technologies, the platform ensures robust performance, efficient task automation, and seamless integration capabilities.

### **Features**

- **Webhooks**: Trigger events and actions programmatically.
- **Email Notifications**: Automate sending and receiving emails.
- **Solana Integration**: Utilize Solana blockchain for decentralized operations.
- **Scalable Architecture**: Powered by Kafka for message streaming.
- **Full-Stack Solution**: Built using Next.js, Node.js, and Express for both frontend and backend functionalities.
- **Database Management**: Prisma ORM integrated with PostgreSQL for efficient data handling.

---
### **Tech Stack**

- **Frontend** : Next.js
- **Backend** : Node.js, Express
- **Database** : PostgresSQL with Prisma
- **Messaging** : Kafka
- **Blockchain** : Solana

---

### **System Design**


---

## **Getting Started**

### Prerequisites

Ensure the following tools are installed on your system:

 - Docker (for containerized environment)
 - Node.js (v18 or later)
 - Kafka (for message brokering)

### Clone Respositry
```
git clone https://github.com/Somnath-Chattaraj/Zapier.git
cd Zapier
```

### Set Up Environment Variables

Create a `.env` file in every location where a `.env.example` file is present. Copy the contents of the corresponding `.env.example` file and update the placeholder values with your actual configuration.

### Start the project
1. **Install Dependencies in every folder**:
```
cd frontend
npm i
cd ../primary_backend
npm i
cd ../hooks
npm i
cd ../worker
npm i
cd ../processor
npm i
```
2. **Start Kafka**:
If using docker, start kafka with
```
docker run -p 9092:9092 -d apache/kafka:3.9.0
```  
Then, access the Kafka container:
```
docker exec -it <container_id> /bin/bash
```
Create a topic named zap-events:

```
bin/kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
```

3. **Run Database Migrations**:
    Go to every folder and migrate the database
```
cd primary_backend
npx prisma migrate dev
cd ../hooks
npx prisma migrate dev
cd ../worker
npx prisma migrate dev
cd ../processor
npx prisma migrate dev
```

4. **Run the Application** 
<br/>
Run the frontend 
```
cd frontend
npm run dev
``` 

Run the primary backend

```
cd primary_backend
tsc -b
node dist/index.js
```

Run the processor

```
cd processor
tsc -b
node dist/index.js
```

Run the worker

```
cd worker
tsc -b
node dist/index.js
```

Run the hooks

```
cd hooks
tsc -b
node dist/index.js
```

5. **Access the application at `http://localhost:3000`**.

## Usage
- **Webhooks**: Configure webhook URLs and trigger actions through the dashboard.
- **Emails**: Set up email templates and automate notifications.
- **Blockchain**: Utilize Solana integration for blockchain-specific triggers and workflows.
