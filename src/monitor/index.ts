import ServiceBase from '~/src/service-base';

export default class Monitor extends ServiceBase {
	reportEvent(eventPayload: unknown): void {
		if (eventPayload instanceof Error) {
			console.error(eventPayload);
		}
	}
}
