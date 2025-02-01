FROM node:bullseye

WORKDIR /app

RUN apt-get install git

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY ./ ./

# Build the application
# RUN pnpm run build

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]

