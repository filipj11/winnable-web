import * as ort from 'onnxruntime-web';

const MODEL_PATH = '../models/xgboost.onnx';
export async function createInferenceSession(): Promise<ort.InferenceSession> {
	const session = await ort.InferenceSession
		.create(MODEL_PATH,
			{ executionProviders: ['wasm'], graphOptimizationLevel: 'all' });

	console.log('Inference session created');
	return session;
}

export async function runInference(session: ort.InferenceSession, preprocessedData: number[]): Promise<number[]> {
	const feeds: Record<string, ort.Tensor> = {};
	const tensorShape = [1, preprocessedData.length];
	feeds[session.inputNames[0]] = new ort.Tensor('float32', preprocessedData, tensorShape);
	const outputData = await session.run(feeds);
	const output = outputData[session.outputNames[0]];

	const arr = Array.prototype.slice.call(output.data);

	if (arr.length != 2) {
		throw new Error("prediction: expected two output values, got " + arr.length);
	}

	return arr;
}
