import { Connection, WorkflowClient } from '@temporalio/client';
import { getTotalMileage } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });

  const client = new WorkflowClient({
    connection,
    // namespace: 'default', // change if you have a different namespace
  });

  const handle = await client.start(getTotalMileage, {
    taskQueue: 'daily-mileage',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
