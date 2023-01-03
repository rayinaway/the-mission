namespace Scenario {
	export type Block = {
		type: string;
	};
}

interface Scenario {
	config: {
		capturingViewport?: boolean;
	};
	blocks: Array<Scenario.Block>;
}

export default Scenario;
