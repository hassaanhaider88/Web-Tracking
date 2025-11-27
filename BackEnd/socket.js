const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Project = require('./models/Project');

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        socket.userId = decoded.userId;

        const projects = await Project.find({ owner: decoded.userId }).lean();

        projects.forEach((project) => {
          socket.join(`project:${project._id}`);
        });

        next();
      } catch (jwtError) {
        return next(new Error('Invalid or expired token'));
      }
    } catch (error) {
      console.error('Socket authentication error:', error);
      return next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id} (user: ${socket.userId})`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;
