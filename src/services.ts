import Monitor from '~/src/monitor';

export interface ServiceCollection {
	monitor: Monitor;
}

const services = {} as ServiceCollection;
services.monitor = new Monitor(services);

export default services;
