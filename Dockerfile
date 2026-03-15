FROM node:22-alpine

# Basic packages
RUN apk add --no-cache \
    bash \
    curl \
    git \
    libc6-compat \
    openjdk21-jre \
    openssh \
    py3-pip \
    python3

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH
RUN [ -e /root/.bun/bin/bunx ] || ln -s /root/.bun/bin/bun /root/.bun/bin/bunx

# Install Firebase CLI
RUN bun install -g firebase-tools
COPY firebase.json /workspace/firebase.json
RUN firebase emulators:exec --only auth,eventarc,functions,hub,logging,pubsub,storage,tasks,ui,firestore "echo 'Firebase emulators are ready'"

# Install Ionic CLI
RUN bun install -g @ionic/cli

WORKDIR /workspace

CMD ["sh"]
