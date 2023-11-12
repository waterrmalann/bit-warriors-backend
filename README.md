# \<BitWarriors/\>
## Nodejs Backend (Service Oriented)

![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) <br/>
![Alpine Linux](https://img.shields.io/badge/Alpine_Linux-%230D597F.svg?style=for-the-badge&logo=alpine-linux&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white) ![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) <br />
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

> [!IMPORTANT]
> **This project is currently under heavy development.**

**\<BitWarriors/\>** is an AI-powered competitive coding platform designed to help beginners improve their programming skills and in turn their problem solving abilities. BitWarriors draws inspiration from platforms like [Leetcode](https://leetcode.com/) and [CodeWars](https://codewars.com/), offering a simplified and beginner friendly version.

**This repository** hosts the backend of this project, which includes all of the services necessary to get the project up and running. The services are containerized using [Docker](https://www.docker.com/) and orchestrated using [Kubernetes](https://kubernetes.io/) with [Apache Kafka](https://kafka.apache.org/) serving as the asynchronous message broker between services.

## 📦 Services

[!](diagram.png)

- **Gateway:** The gateway is responsible for accepting the initial request, authenticating it (using JWT), and proxying it to other services.
- **Admin Service:** A superuser service that lets a sysop manage and talk to individual services. This is also where problems and learning paths are added.
- **User Service:** Everything from initial authorization to user profiles, follower relationships and inboxes are part of the user service.
- **Problem Service:** Coding challenges and learning paths are served and kept track of by this service.
- **Submission Service:** Handling the submission, analysis, testing, and ranking of user submitted code.
    - **Test Service (Internal):** Responsible for statically analysing and executing abitrary code using the Code Execution Sandbox. Also keeps track of test cases for each question.
    - **AI Service (Internal):** An experimental service that utilizes an AI model to grade and generate feedback on code. 
- **Discuss Service:**  Submission and retrieval of writeups, comments, and discussions on problems.
- **Notification Service (Internal):** General purpose server solely responsible for delivering email notifications and alerts. 
- **Code Execution Sandbox (Internal):** An isolated, virtualized, container holding various language runtimes for safe execution of abitrary code.

## 🚀 Getting Started

>[!NOTE]
> **BitWarriors** being architecturally complex, hosts a separate repository for the frontend layer, which is built using React and NextJS. This is also under development [here](https://github.com/waterrmalann/bit-warriors-nextjs). Stay tuned for instructions to self-host!

## 🤝 Contribution

>[!NOTE]
> This project is far from complete to start accepting contributions.

## License

This project is licensed under the **AGPLv3 License**, see [LICENSE](LICENSE).