import { createConsumer } from '@rails/actioncable';
const URL = 'ws://localhost:3000/AIAssistantCable';
const consumer = createConsumer(URL);
 
export default consumer;
