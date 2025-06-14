'use strict';

// "@opentelemetry/auto-instrumentations-node"

const initOTelFoo = require('./initOTelManualFoo');

async function main() {
    const oTel = await initOTelFoo();
    const testMain = require('./tests/basicTrace');
    testMain(...Object.values(oTel));
};

main();