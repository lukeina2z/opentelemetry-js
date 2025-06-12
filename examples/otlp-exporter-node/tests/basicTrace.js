'use strict';

function doWork(parent, oTelApi, tracer) {
    // Start another span. In this example, the main method already started a
    // span, so that'll be the parent span, and this will be a child span.
    const ctx = oTelApi.trace.setSpan(oTelApi.context.active(), parent);
    const span = tracer.startSpan('doWork', undefined, ctx);

    // simulate some random work.
    for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
        // empty
    }

    // Set attributes to the span.
    span.setAttribute('color', 'green');

    // Annotate our span to capture metadata about our operation
    span.addEvent('invoking doWork');
    span.end();
}

module.exports = async function main(oTelApi, oTelTracerProvider) {
    const tracer = oTelApi.trace.getTracer('example-basic-tracer-node');
    // Create a span. A span must be closed.
    const parentSpan = tracer.startSpan('main');
    for (let i = 0; i < 10; i += 1) {
        doWork(parentSpan, oTelApi, tracer);
    }
    // Be sure to end the span.
    parentSpan.end();

    // flush and close the connection.
    await oTelTracerProvider.shutdown();
    // oTelApi.shutdown();
    // exporter.shutdown();
    console.log(`Tracer is down now.`);
}
