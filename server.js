import fastify from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.post("/videos", (request, reply) => {
  const { tittle, description, duration } = request.body;

  database.create({
    tittle,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", () => {
  const videos = database.list();

  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoID = request.params.id;
  const { tittle, description, duration } = request.body;

  database.update(videoID, {
    tittle,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
