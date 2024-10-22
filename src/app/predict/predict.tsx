import * as ort from 'onnxruntime-web';

export async function runXGBoostModel(data: number[]): Promise<any> {
    const session = await ort.InferenceSession
                            .create('/models/xgboost.onnx',
                            { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });

    console.log('Inference session created');

    const results = await runInference(session, data);

    return results;
}

async function runInference(session: ort.InferenceSession, preprocessedData: number[]): Promise<any> {
    const feeds: Record<string, ort.Tensor> = {};
    
    const tensorShape = [1, preprocessedData.length];
    feeds[session.inputNames[0]] = new ort.Tensor('float32', preprocessedData, tensorShape);

    const outputData = await session.run(feeds);

    const output = outputData[session.outputNames[0]];
    
    return Array.prototype.slice.call(output.data);
}