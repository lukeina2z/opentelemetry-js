'use strict';

process.env.OTEL_NODE_ENABLED_INSTRUMENTATIONS = "fs,http,nestjs-core";
process.env.OTEL_SERVICE_NAME = 'X-Auto-Instr-Foo';
// process.env.OTEL_LOG_LEVEL = 'error';
process.env.OTEL_LOG_LEVEL = 'debug';
// process.env.OTEL_LOG_LEVEL = 'verbose';
// process.env.OTEL_LOG_LEVEL = 'all';

const autoMain = require('./initOTelAuto');

const { context, trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('my-service');
const topSpan = tracer.startSpan(
    'XXX-TOP-GUN',
    undefined, // span options like kind or attributes could go here
    context.active() // sets the parent context
);

context.with(trace.setSpan(context.active(), topSpan), () => {
    const basicTraceTest = require('./tests/basicTrace');
    basicTraceTest().then(() => {
        console.log(`End of auto-inst testing.`);
    });
});

topSpan.end();

// const fooMain = require('./initOTelManualFoo');
// fooMain();

console.log(`The End`);