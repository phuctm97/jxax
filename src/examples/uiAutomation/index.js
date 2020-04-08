import WorkflowBuilder from 'jxax/core/workflow';

const workflow = new WorkflowBuilder()
  .begin(() => {
    console.log('Begin 1');
  })
  .begin(() => {
    console.log('Begin 2');
  })
  .end(() => {
    console.log('End 1');
  })
  .end(() => {
    console.log('End 2');
  })
  .run(() => {
    console.log('Hello World 1');
  })
  .run(() => {
    throw new Error('X');
  })
  .retry(3)
  .ignoreError()
  .build();

workflow();
