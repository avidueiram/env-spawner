FROM node:22-alpine

# Basic packages
RUN apk add --no-cache \
    bash \
    git \
    curl \
    openssh \
    libc6-compat

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH

# Install Firebase CLI
RUN npm install -g firebase-tools

# Install Ionic CLI
RUN npm install -g @ionic/cli

WORKDIR /workspace

CMD ["sh"]
