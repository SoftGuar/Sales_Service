var amqp = require('amqplib/callback_api');
import { randomUUID } from 'crypto';

async function requestRPC(n:any) {
    const conn = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await conn.createChannel();
    const queue = 'rpc_queue';
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    const correlationId = randomUUID(); // Unique ID to match responses

    console.log(` [x] Requesting ${n} * 2`);

    channel.sendToQueue(queue, Buffer.from(n.toString()), {
        correlationId,
        replyTo: replyQueue.queue,
    });

    channel.consume(replyQueue.queue, (msg:any) => {
        if (msg.properties.correlationId === correlationId) {
            console.log(` [.] Got response: ${msg.content.toString()}`);
            channel.close();
            conn.close();
        }
    }, { noAck: true });
}


